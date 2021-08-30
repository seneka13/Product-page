import express from 'express';
import {
  getIndex,
  getCart,
  postCart,
  getProducts,
  getOrders,
  getProduct,
  postCartDeleteItem,
  postOrder,
} from '../controllers/shop';

const router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:prodId', getProduct);

router.get('/cart', getCart);

router.post('/cart', postCart);

router.post('/cart-delete-item', postCartDeleteItem);

router.post('/create-order', postOrder);

router.get('/orders', getOrders);


export default router;
