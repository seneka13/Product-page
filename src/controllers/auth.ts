import { User } from '../model/user';
import { RouterController } from '../types';
import bcrypt from 'bcryptjs';

export const getLogin: RouterController = (req, res, next) => {
  res.render('auth/login', {
    path: '/auth/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn,
  });
};

export const postLogin: RouterController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
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
      res.redirect('/auth/login');
    }
  } catch (error) {
    console.log(error, 'errr');
    return res.redirect('/auth/login');
  }
};

export const getSignup: RouterController = (req, res, next) => {
  res.render('auth/signup', {
    path: '/auth/signup',
    pageTitle: 'Signup',
    isAuthenticated: req.session.isLoggedIn,
  });
};

export const postSignup: RouterController = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.redirect('/auth/signup');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ email, password: hashedPassword, cart: { items: [] } });
  } catch (error) {
    console.log(error, 'errr');
  }

  res.redirect('/auth/login');
};

export const postLogout: RouterController = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
};
