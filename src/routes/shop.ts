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
  getCheckout,
  getInvoice,
  getCheckoutSuccess,
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

router.get('/checkout', isAuth, getCheckout);

router.get('/checkout/success', isAuth, getCheckoutSuccess);

router.get('/checkout/cancel', isAuth, getCheckout);

router.get('/orders', isAuth, getOrders);

router.get('/orders/:orderId', isAuth, getInvoice);

export default router;
