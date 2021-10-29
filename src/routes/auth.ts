import express from 'express';
import {
  getLogin,
  getNewPassword,
  getReset,
  getSignup,
  postLogin,
  postLogout,
  postNewPassword,
  postReset,
  postSignup,
} from '../controllers/auth';
import { check, body } from 'express-validator';
import { User } from '../model/user';

const authRouter = express.Router();

authRouter.get('/login', getLogin);

authRouter.get('/signup', getSignup);

authRouter.get('/reset', getReset);

authRouter.get('/reset/:token', getNewPassword);

authRouter.post(
  '/signup',
  [
    check('email', 'INVALID EMAIL !!!')
      .isEmail()
      .normalizeEmail()
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error('Email exist already');
        }
        return user;
      })
      .trim(),
    body('password', 'Please enter valid password')
      .isLength({ min: 5, max: 16 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
      .trim(),
  ],
  postSignup
);

authRouter.post(
  '/login',
  [
    check('email', 'INVALID EMAIL !!!').isEmail().normalizeEmail().trim(),
    body('password', 'Please enter valid password').isLength({ min: 5, max: 16 }).isAlphanumeric(),
  ],
  postLogin
);

authRouter.post('/logout', postLogout);

authRouter.post('/reset', postReset);

authRouter.post('/new-password', postNewPassword);

export default authRouter;
