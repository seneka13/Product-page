import { RouterController } from '../types';

export const get404: RouterController = (req, res, next) =>
  res
    .status(404)
    .render('404', { pageTitle: '404 haha', path: '', isAuthenticated: req.session.isLoggedIn });

export const get500: RouterController = (req, res, next) =>
  res
    .status(500)
    .render('500', { pageTitle: 'Page Error', path: '', isAuthenticated: req.session.isLoggedIn });
