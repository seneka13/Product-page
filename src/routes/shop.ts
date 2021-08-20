import express from 'express';
import path from 'path';
import {
  getIndex,
  getCart,
  postCart,
  getProducts,
  getOrders,
  getProduct,
} from '../controllers/shop';

const router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:prodId', getProduct);

router.get('/cart', getCart);

router.post('/cart', postCart);

router.get('/orders', getOrders);

router.get('/checkout', getCart);

export default router;
