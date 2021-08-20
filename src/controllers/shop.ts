import { Product } from '../model/product';
import { RouterController } from '../types';

export const getProducts: RouterController = (req, res, next) => {
  //   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  Product.fetchAll((products: any) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/products',
    });
  });
};

export const getProduct: RouterController = (req, res, next) => {
  //   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  const prodId = req.params.prodId;
  Product.findById(prodId, (product: any) => {
    res.render('shop/product-detail', {
      product,
      pageTitle: 'Product Page',
      path: '/products',
    });
  });
};

export const getIndex: RouterController = (req, res, next) => {
  Product.fetchAll((products: any) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Main Page',
      path: '/',
    });
  });
};

export const getCart: RouterController = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Cart',
    path: '/cart',
  });
};

export const postCart: RouterController = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
};

export const getOrders: RouterController = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
  });
};

export const getCheckout: RouterController = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};
