import { RouterController } from '../types';

export const get404: RouterController = (req, res, next) =>
  res.status(404).render('404', { pageTitle: '404 haha', path: '' });
