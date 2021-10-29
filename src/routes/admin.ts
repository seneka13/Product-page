import express from 'express';
import path from 'path';
import {
  addProduct,
  editProduct,
  getProducts,
  deleteProduct,
  postEditProduct,
  postAddProduct,
} from '../controllers/admin';
import { isAuth } from '../middleware/isAuth';
import { check, body } from 'express-validator';

const app = express();

const adminRouter = express.Router();

adminRouter.get('/add-product', isAuth, addProduct);

adminRouter.post('/add-product', isAuth, postAddProduct);

adminRouter.get('/edit-product/:prodId', isAuth, editProduct);

adminRouter.post('/edit-product', isAuth, postEditProduct);

adminRouter.get('/products', isAuth, getProducts);

adminRouter.delete('/product/:prodId', isAuth, deleteProduct);

export default adminRouter;
