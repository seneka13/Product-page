import { Cart } from '../model/cart';
import Product, { ProductType } from '../model/product';
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

export const getCart: RouterController = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
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
  const prodId = req.body.prodId;
  const cart = await req.user.getCart();
  const products = await cart.getProducts({ where: { id: prodId } });
  const product = products.length > 0 && products[0];
  let newQuantity = 1;
  if (product) {
    const oldQty = product.cartItem?.quantity;
    newQuantity = oldQty + 1;
    await cart.addProduct(product, {
      through: { quantity: newQuantity },
    });
    res.redirect('/');
    return;
  }
  const originProduct = await Product.findByPk(prodId);
  await cart.addProduct(originProduct, {
    through: { quantity: newQuantity },
  });
  res.redirect('/');
};

export const postCartDeleteItem: RouterController = async (req, res, next) => {
  try {
    const prodId = req.body.prodId;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: prodId } });
    const product = products[0];
    product.cartItem.destroy();
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
};

export const postOrder: RouterController = async (req, res, next) => {
  const cart = await req.user.getCart();
  const products = await cart.getProducts();
  const order = await req.user.createOrder();
  await order.addProducts(
    products.map((p: any) => {
      p.orderItem = { quantity: p.cartItem.quantity };
      return p;
    })
  );
  await cart.setProducts(null);
  res.redirect('/orders');
};

export const getOrders: RouterController = async (req, res, next) => {
  const orders = await req.user.getOrders({ include: ['products'] });
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
    orders,
  });
};
