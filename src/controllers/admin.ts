import { Product } from '../model/product';
import { RouterController } from '../types';

export const addProducts: RouterController = (req, res, next) => {
  //   res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render('admin/add-product', { prods: [], pageTitle: 'Add Product', path: '/admin/add-product' });
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
  const product = new Product(title, price, description, imgUrl);
  product.save();
  res.redirect('/products');
};
