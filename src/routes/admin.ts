import express from 'express';
import path from 'path';
import { addProducts, getProducts, productPosts } from '../controllers/admin';

const app = express();

export const adminRouter = express.Router();

adminRouter.get('/add-product', addProducts);

adminRouter.get('/products', getProducts)

adminRouter.post('/add-product', productPosts);
