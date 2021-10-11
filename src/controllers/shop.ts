// import { Cart } from '../model/cart';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { RouterController } from '../types';

export const getProducts: RouterController = async (req, res, next) => {
  //   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  try {
    const allProducts = await Product.find();
    res.render('shop/product-list', {
      pageTitle: 'Products',
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
    const product = await Product.findById(prodId);
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
    const allProducts = await Product.find();
    res.render('shop/index', {
      pageTitle: 'Main',
      path: '/',
      prods: allProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCart: RouterController = async (req, res, next) => {
  try {
    const user = await req.user.populate('cart.items.prodId');
    res.render('shop/cart', {
      pageTitle: 'Cart',
      path: '/cart',
      products: user.cart.items,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postCart: RouterController = async (req, res, next) => {
  try {
    const { prodId } = req.body;
    const product = await Product.findById(prodId);
    await req.user.addToCart(product);
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
};

export const postCartDeleteItem: RouterController = async (req, res, next) => {
  try {
    const prodId = req.body.prodId;
    await req.user.removeFromCart(prodId);
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
};

export const postOrder: RouterController = async (req, res, next) => {
  const user = await req.user.populate('cart.items.prodId');
  const products = user.cart.items.map((p: any) => ({
    product: { ...p.prodId._doc },
    quantity: p.quantity,
  }));
  await Order.create({
    products,
    user: {
      email: req.user.email,
      userId: req.user,
    },
  });
  req.user.clearCart();
  res.redirect('/orders');
};

export const getOrders: RouterController = async (req, res, next) => {
  const orders = await Order.find({ 'user.userId': req.user._id });
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
    orders,
  });
};
