import { ObjectId } from 'bson';
import { Product } from '../model/product';
import { RouterController } from '../types';

export const addProduct: RouterController = (req, res, next) => {
  //   res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));

  res.render('admin/edit-product', {
    prods: [],
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

export const postAddProduct: RouterController = async (req, res, next) => {
  try {
    const { title, imgUrl, price, description } = req.body;
    await Product.create({ title, price, description, imgUrl, userId: req.user });
    res.redirect('/admin/products');
  } catch (error) {
    console.log(error);
  }
};

export const editProduct: RouterController = async (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.prodId;

  const product = await Product.findById(prodId);
  if (!editMode || !product) {
    return res.redirect('/');
  }
  res.render('admin/edit-product', {
    product,
    pageTitle: 'Edit Product',
    path: '/admin/add-product',
    editing: editMode,
    isAuthenticated: req.session.isLoggedIn,
  });
};

export const postEditProduct: RouterController = async (req, res, next) => {
  const { prodId, title, imgUrl, price, description } = req.body;
  try {
    const product = await Product.findById(prodId);
    if (String(product!.userId) !== String(req.user._id)) {
      return res.redirect('/');
    }
    product!.title = title;
    product!.imgUrl = imgUrl;
    product!.price = price;
    product!.description = description;

    await product!.save();
    res.redirect('/admin/products');
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteProduct: RouterController = async (req, res, next) => {
  const { prodId } = req.body;
  const product = await Product.deleteOne({ _id: prodId, userId: req.user._id });
  res.redirect('/admin/products');
};

export const getProducts: RouterController = async (req, res, next) => {
  const products = await Product.find({ userId: req.user._id });
  // .select('title price -_id')
  // .populate('userId', 'name');
  res.render('admin/products', {
    prods: products || [],
    pageTitle: 'Admin Products',
    path: '/admin/products',
    isAuthenticated: req.session.isLoggedIn,
  });
};
