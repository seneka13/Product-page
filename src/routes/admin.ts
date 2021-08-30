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

const app = express();

export const adminRouter = express.Router();

adminRouter.get('/add-product', addProduct);

adminRouter.get('/edit-product/:prodId', editProduct);

adminRouter.post('/edit-product', postEditProduct);

adminRouter.get('/products', getProducts);

adminRouter.post('/delete-product', postDeleteProduct);

adminRouter.post('/add-product', postAddProduct);
