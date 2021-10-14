import { User } from '../model/user';
import { RouterController } from '../types';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

sgMail.setApiKey('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');

export const getLogin: RouterController = (req, res, next) => {
  let message = req.flash('error');
  res.render('auth/login', {
    path: '/auth/login',
    pageTitle: 'Login',
    errorMessage: message.length > 0 ? message[0] : null,
  });
};

export const postLogin: RouterController = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(422).render('auth/login', {
        path: '/auth/login',
        pageTitle: 'Login',
        errorMessage: errors.array()[0].msg,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }
    const isAutheticated = await bcrypt.compare(password, user.password);
    if (isAutheticated) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(() => {
        res.redirect('/');
      });
    } else {
      req.flash('error', 'Invalid email or password');
      res.redirect('/auth/login');
    }
  } catch (error) {
    console.log(error, 'errr');
    return res.redirect('/auth/login');
  }
};

export const getSignup: RouterController = (req, res, next) => {
  let message = req.flash('error');
  res.render('auth/signup', {
    path: '/auth/signup',
    pageTitle: 'Signup',
    errorMessage: message.length > 0 ? message[0] : null,
  });
};

export const postSignup: RouterController = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  try {
    console.log(errors.array(), 'validator');
    if (!errors.isEmpty()) {
      return res.status(422).render('auth/signup', {
        path: '/auth/signup',
        pageTitle: 'Signup',
        errorMessage: errors.array()[0].msg,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ email, password: hashedPassword, cart: { items: [] } });
  } catch (error) {
    console.log(error, 'errr');
  }

  try {
    await sgMail.send({
      to: email,
      from: 'samkazus130293@gmail.com',
      subject: 'Signup succeded',
      html: '<h1>Signup success</h1>',
    });
    res.redirect('/auth/login');
  } catch (error) {
    console.log(error);
  }
};

export const postLogout: RouterController = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
};

export const getReset: RouterController = (req, res, next) => {
  let message = req.flash('error');
  res.render('auth/reset', {
    path: '/auth/reset',
    pageTitle: 'Reset Password',
    errorMessage: message.length > 0 ? message[0] : null,
  });
};

export const postReset: RouterController = async (req, res, next) => {
  const { email } = req.body;
  try {
    const token = await crypto.randomBytes(32).toString('hex');
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/auth/reset');
    }
    user.resetToken = token;
    user.resetTokenExp = Date.now() + 360000;
    await user.save();
    await sgMail.send({
      to: email,
      from: 'samkazus130293@gmail.com',
      subject: 'Reset Password',
      html: `	<h1>You requested a password reset </h1>
				<p>Click this <a href="http://localhost:3000/auth/reset/${token}">link</a> to set a new password</p>`,
    });
    return res.redirect('/');
  } catch (error) {
    console.log(error);
  }
  let message = req.flash('error');
  res.render('auth/reset', {
    path: '/auth/reset',
    pageTitle: 'Reset Password',
    errorMessage: message.length > 0 ? message[0] : null,
  });
};

export const getNewPassword: RouterController = async (req, res, next) => {
  const token = req.params.token;
  const user = await User.findOne({ resetToken: token, resetTokenExp: { $gt: Date.now() } });
  let message = req.flash('error');
  res.render('auth/new-password', {
    path: '/auth/new-password',
    pageTitle: 'New Password',
    errorMessage: message.length > 0 ? message[0] : null,
    userId: user!._id.toString(),
    passwordToken: token,
  });
};

export const postNewPassword: RouterController = async (req, res, next) => {
  const { password, userId, passwordToken } = req.body;
  try {
    const user = await User.findOne({
      resetToken: passwordToken,
      resetTokenExp: { $gt: Date.now() },
      _id: userId,
    });
    const hashedPass = await bcrypt.hash(password, 12);
    if (user) {
      user.password = hashedPass;
      user.resetToken = undefined;
      user.resetTokenExp = undefined;
      await user.save();
      res.redirect('/auth/login');
    }
  } catch (error) {
    console.log(error);
  }
};
