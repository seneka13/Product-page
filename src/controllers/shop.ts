// import { Cart } from '../model/cart';
import Product, { ProductType } from '../model/product';
import { User } from '../model/user';
import { CartType, RouterController } from '../types';

export const getProducts: RouterController = async (req, res, next) => {
  //   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  try {
    const allProducts = await Product.fetchAll();
    res.render('shop/product-list', {
      pageTitle: 'Cart',
      path: '/products',
      prods: allProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProduct: RouterController = async (req, res, next) => {
  //   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  try {
    const prodId = req.params.prodId;
    const product = await Product.getById(prodId);
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Product Page',
      path: '/products',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getIndex: RouterController = async (req, res, next) => {
  try {
    const allProducts = await Product.fetchAll();
    res.render('shop/index', {
      pageTitle: 'Cart',
      path: '/',
      prods: allProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCart: RouterController = async (req, res, next) => {
  try {
    const products = await req.user.getCart();
    res.render('shop/cart', {
      pageTitle: 'Cart',
      path: '/cart',
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postCart: RouterController = async (req, res, next) => {
  try {
    const { prodId } = req.body;
    const product = await Product.getById(prodId);
    await req.user.addToCart(product);
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
};

export const postCartDeleteItem: RouterController = async (req, res, next) => {
  try {
    const prodId = req.body.prodId;
    await req.user.deleteCart(prodId);
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
};

export const postOrder: RouterController = async (req, res, next) => {
  await req.user.addOrder();
  res.redirect('/orders');
};

export const getOrders: RouterController = async (req, res, next) => {
  const orders = await req.user.getOrders();
  console.log(orders);
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
    orders,
  });
};
