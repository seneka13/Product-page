import { RouterController } from '../types';

export const setLocalCsrf: RouterController = (req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
};
