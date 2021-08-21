"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPosts = exports.getProducts = exports.postDeleteProduct = exports.postEditProduct = exports.editProduct = exports.addProduct = void 0;
var product_1 = require("../model/product");
var addProduct = function (req, res, next) {
    //   res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/edit-product', {
        prods: [],
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};
exports.addProduct = addProduct;
var editProduct = function (req, res, next) {
    var editMode = req.query.edit;
    var prodId = req.params.prodId;
    if (!editMode) {
        return res.redirect('/');
    }
    product_1.Product.findById(prodId, function (product) {
        res.render('admin/edit-product', {
            product: product,
            pageTitle: 'Edit Product',
            path: '/admin/add-product',
            editing: editMode,
        });
    });
};
exports.editProduct = editProduct;
var postEditProduct = function (req, res, next) {
    var _a = req.body, prodId = _a.prodId, title = _a.title, imgUrl = _a.imgUrl, price = _a.price, description = _a.description;
    var product = new product_1.Product(title, price, description, imgUrl, prodId);
    product.save();
    res.redirect('/admin/products');
};
exports.postEditProduct = postEditProduct;
var postDeleteProduct = function (req, res, next) {
    var prodId = req.body.prodId;
    console.log(prodId);
    product_1.Product.deleteById(prodId);
    res.redirect('/admin/products');
};
exports.postDeleteProduct = postDeleteProduct;
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
    var product = new product_1.Product(title, price, description, imgUrl, null);
    product.save();
    res.redirect('/products');
};
exports.productPosts = productPosts;
