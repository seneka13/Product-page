"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPosts = exports.getProducts = exports.addProducts = void 0;
var product_1 = require("../model/product");
var addProducts = function (req, res, next) {
    //   res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/add-product', { prods: [], pageTitle: 'Add Product', path: '/admin/add-product' });
};
exports.addProducts = addProducts;
var getProducts = function (req, res, next) {
    product_1.Product.fetchAll(function (products) {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    });
};
exports.getProducts = getProducts;
var productPosts = function (req, res, next) {
    var _a = req.body, title = _a.title, imgUrl = _a.imgUrl, price = _a.price, description = _a.description;
    var product = new product_1.Product(title, price, description, imgUrl);
    product.save();
    res.redirect('/products');
};
exports.productPosts = productPosts;
