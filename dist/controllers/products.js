"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = exports.getProducts = exports.productCart = void 0;
var product_1 = require("../model/product");
var productCart = function (req, res, next) {
    //   res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('shop/product-cart', { products: [], pageTitle: 'Add Product', path: '/cart' });
};
exports.productCart = productCart;
var getProducts = function (req, res, next) {
    //   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    product_1.Product.fetchAll(function (products) {
        res.render('shop/product-list', {
            products: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
};
exports.getProducts = getProducts;
var getIndex = function (req, res, next) {
    product_1.Product.fetchAll(function (products) {
        res.render('shop/index', {
            products: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
};
exports.getIndex = getIndex;
