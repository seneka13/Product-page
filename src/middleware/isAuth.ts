import { RouterController } from '../types';

export const isAuth: RouterController = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/auth/login');
  }
  next();
};
