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

const authRouter = express.Router();

authRouter.get('/login', getLogin);

authRouter.get('/signup', getSignup);

authRouter.get('/reset', getReset);

authRouter.get('/reset/:token', getNewPassword);

authRouter.post('/signup', postSignup);

authRouter.post('/login', postLogin);

authRouter.post('/logout', postLogout);

authRouter.post('/reset', postReset);

authRouter.post('/new-password', postNewPassword);

export default authRouter;
