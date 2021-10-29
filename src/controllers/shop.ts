// import { Cart } from '../model/cart';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { RouterController } from '../types';
import PDFDocument from 'pdfkit';
import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';

const stripe = new Stripe();

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

const ITEMS_PER_PAGE = 1;

export const getIndex: RouterController = async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  try {
    const totalItems = await Product.find().count();
    const allProducts = await Product.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    res.render('shop/index', {
      pageTitle: 'Main',
      path: '/',
      prods: allProducts,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
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

export const getCheckout: RouterController = async (req, res, next) => {
  try {
    const user = await req.user.populate('cart.items.prodId');
    const products = user.cart.items;
    let totalSum = 0;
    products.forEach((p: any) => (totalSum += p.quantity * p.prodId.price));
    console.log(req.get('host'), req.protocol);
    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ['card'],
        line_items: products.map((p: any) => ({
          name: p.prodId.title,
          description: p.prodId.description,
          amount: p.prodId.price * 100,
          currency: 'usd',
          quantity: p.quantity,
        })),
        success_url: req.protocol + '://' + req.get('host') + '/checkout/success',
        cancel_url: req.protocol + '://' + req.get('host') + '/checkout/cancel',
      },
      { stripeAccount: '' }
    );
    console.log(session);
    res.render('shop/checkout', {
      pageTitle: 'Checkout',
      path: '/checkout',
      products,
      totalSum,
      sessionId: session.id,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const getCheckoutSuccess: RouterController = async (req, res, next) => {
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

export const getInvoice: RouterController = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId);
    if (!order && order!.user.userId !== req.user._id) {
      throw new Error('No order found');
    }
    const invoiceName = 'Invoice-' + orderId + '.pdf';
    const invoicePath = path.join('src', 'invoices', invoiceName);
    res.setHeader('Content-Type', 'application/pdf');
    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);

    pdfDoc.fontSize(26).text('Invoice', {
      underline: true,
      ellipsis: true,
    });
    pdfDoc.text('--------------------------');
    for (const prod of order!.products) {
      console.log(prod);
      pdfDoc.text(`${prod.product.title} - ${prod.quantity}: $${prod.product.price} `);
    }
    pdfDoc.end();
  } catch (error: any) {
    return next(new Error(error));
  }

  //   fs.readFile(path.join('src', 'invoices', invoiceName), (err, data) => {
  //     console.log(err);
  //     console.log(data);
  //     if (err) {
  //       return next(err);
  //     }
  //     res.setHeader('Content-Type', 'application/pdf');
  //     res.send(data);
  //   });
  //   const file = fs.createReadStream(invoicePath);

  //   file.pipe(res);
};
