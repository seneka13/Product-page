import express from 'express';
import path from 'path';
import {
  getIndex,
  getCart,
  postCart,
  getProducts,
  getOrders,
  getProduct,
  postCartDeleteItem,
} from '../controllers/shop';

const router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:prodId', getProduct);

router.get('/cart', getCart);

router.post('/cart', postCart);

router.post('/cart-delete-item', postCartDeleteItem);

router.get('/orders', getOrders);

router.get('/checkout', getCart);

export default router;
