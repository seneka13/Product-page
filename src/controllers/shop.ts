import { Cart } from '../model/cart';
import { Product } from '../model/product';
import { CartType, RouterController } from '../types';

export const getProducts: RouterController = async (req, res, next) => {
  //   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  try {
    const allProducts = await Product.findAll();
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
    const [product] = await Product.findAll({ where: { id: prodId } });
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
    const allProducts = await Product.findAll();
    res.render('shop/index', {
      pageTitle: 'Cart',
      path: '/',
      prods: allProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCart: RouterController = (req, res, next) => {
  Cart.getCart((cart: CartType) => {
    Product.findAll()
      .then(([rows, fieldData]) => {
        res.render('shop/cart', {
          pageTitle: 'Cart',
          path: '/cart',
          products: rows || [],
        });
      })
      .catch((err) => {
        console.log(err);
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
  Product.findByPk(prodId, (prod: any) => {
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
