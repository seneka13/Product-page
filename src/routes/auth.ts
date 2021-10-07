import express from 'express';
import { getLogin, getSignup, postLogin, postLogout, postSignup } from '../controllers/auth';

export const authRouter = express.Router();

authRouter.get('/login', getLogin);

authRouter.get('/signup', getSignup);

authRouter.post('/signup', postSignup);

authRouter.post('/login', postLogin);

authRouter.post('/logout', postLogout);
