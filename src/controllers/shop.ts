import { Cart } from '../model/cart';
import { Product } from '../model/product';
import { CartType, RouterController, ProductType } from '../types';

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

type CartProduct = {
  productData: ProductType;
  qty: number;
};

export const getCart: RouterController = (req, res, next) => {
  Cart.getCart((cart: CartType) => {
    Product.fetchAll((products: ProductType[]) => {
      const cartProductArr: CartProduct[] = [];
      products.reduce((cartsArr, p) => {
        const cartData = cart.products.find((c) => p.id === c.id);
        if (cartData) {
          cartsArr.push({ productData: p, qty: cartData.qty });
        }
        return cartsArr;
      }, cartProductArr);
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: cartProductArr || [],
      });
    });
  });
};

export const postCart: RouterController = (req, res, next) => {
  const prodId = req.body.prodId;
  Product.findById(prodId, (prod: any) => {
    Cart.addProduct(prodId, prod.price);
  });
  res.redirect('/');
};

export const postCartDeleteItem: RouterController = (req, res, next) => {
  const prodId = req.body.prodId;
  console.log(prodId);
  Product.findById(prodId, (prod: any) => {
    console.log(prod);
    Cart.deleteProduct(prodId, prod.price);
    res.redirect('/cart');
  });
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
