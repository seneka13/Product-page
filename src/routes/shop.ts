import express from 'express';
import {
  getIndex,
  getCart,
  getProducts,
  getOrders,
  getProduct,
  postCart,
  postCartDeleteItem,
  postOrder,
} from '../controllers/shop';
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:prodId', getProduct);

router.get('/cart', isAuth, getCart);

router.post('/cart', isAuth, postCart);

router.post('/cart-delete-item', isAuth, postCartDeleteItem);

router.post('/create-order', isAuth, postOrder);

router.get('/orders', isAuth, getOrders);

export default router;
