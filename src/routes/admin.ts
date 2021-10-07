import express from 'express';
import path from 'path';
import {
  addProduct,
  editProduct,
  getProducts,
  postDeleteProduct,
  postEditProduct,
  postAddProduct,
} from '../controllers/admin';
import { isAuth } from '../middleware/isAuth';

const app = express();

export const adminRouter = express.Router();

adminRouter.get('/add-product', isAuth, addProduct);

adminRouter.post('/add-product', isAuth, postAddProduct);

adminRouter.get('/edit-product/:prodId', isAuth, editProduct);

adminRouter.post('/edit-product', isAuth, postEditProduct);

adminRouter.get('/products', isAuth, getProducts);

adminRouter.post('/delete-product', postDeleteProduct);
