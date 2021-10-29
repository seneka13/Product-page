import { Product } from '../model/product';
import { RouterController } from '../types';
import { validationResult } from 'express-validator';
import path from 'path';
import { deleteFile } from '../utils/file';

export const addProduct: RouterController = (req, res, next) => {
  //   res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));

  res.render('admin/edit-product', {
    prods: [],
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    errorMessage: '',
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

export const postAddProduct: RouterController = async (req, res, next) => {
  let message = req.flash('error');
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(422).render('admin/edit-product', {
        path: '/admin/add-product',
        pageTitle: 'Add product',
        errorMessage: errors.array()[0].msg,
        editing: false,
        isAuthenticated: req.session.isLoggedIn,
      });
    }
    const { title, price, description } = req.body;
    const { file } = req;
    if (!file) {
      return res.status(422).render('admin/edit-product', {
        path: '/admin/add-product',
        pageTitle: 'Add product',
        errorMessage: errors.array()[0].msg,
        editing: false,
        isAuthenticated: req.session.isLoggedIn,
      });
    }
    await Product.create({
      title,
      price,
      description,
      imgUrl: path.join('/images', file.filename),
      userId: req.user,
    });
    res.redirect('/admin/products');
  } catch (error: any) {
    const err = new Error(error);
    return next(err);
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
    errorMessage: '',
    editing: editMode,
    isAuthenticated: req.session.isLoggedIn,
  });
};

export const postEditProduct: RouterController = async (req, res, next) => {
  const { prodId, title, price, description } = req.body;
  const { file } = req;
  try {
    const product = await Product.findById(prodId);
    if (String(product!.userId) !== String(req.user._id)) {
      return res.redirect('/');
    }
    product!.title = title;
    if (file) {
      deleteFile(path.join('src', 'public', product!.imgUrl));
      product!.imgUrl = path.join('/images', file.filename);
    }
    product!.price = price;
    product!.description = description;

    await product!.save();
    res.redirect('/admin/products');
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct: RouterController = async (req, res, next) => {
  try {
    const { prodId } = req.params;
    const product = await Product.findById(prodId);
    if (!product) {
      return next(new Error('No such product'));
    }
    await Product.deleteOne({ _id: prodId, userId: req.user._id });
    deleteFile(path.join('src', 'public', product!.imgUrl));
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: 'Failed' });
  }
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
