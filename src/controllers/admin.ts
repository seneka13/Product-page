import { Product } from '../model/product';
import { RouterController } from '../types';

export const addProduct: RouterController = (req, res, next) => {
  //   res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render('admin/edit-product', {
    prods: [],
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

export const editProduct: RouterController = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.prodId;
  if (!editMode) {
    return res.redirect('/');
  }
  Product.findById(prodId, (product: any) => {
    res.render('admin/edit-product', {
      product,
      pageTitle: 'Edit Product',
      path: '/admin/add-product',
      editing: editMode,
    });
  });
};

export const postEditProduct: RouterController = (req, res, next) => {
  const { prodId, title, imgUrl, price, description } = req.body;
  const product = new Product(title, price, description, imgUrl, prodId);
  product.save();
  res.redirect('/admin/products');
};

export const postDeleteProduct: RouterController = (req, res, next) => {
  const { prodId } = req.body;
  console.log(prodId);
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};

export const getProducts: RouterController = (req, res, next) => {
  Product.fetchAll((products: any) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};

export const productPosts: RouterController = (req, res, next) => {
  const { title, imgUrl, price, description } = req.body;
  const product = new Product(title, price, description, imgUrl, null);
  product.save();
  res.redirect('/products');
};
