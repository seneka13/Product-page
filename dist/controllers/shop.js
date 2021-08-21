"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckout = exports.getOrders = exports.postCartDeleteItem = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
var cart_1 = require("../model/cart");
var product_1 = require("../model/product");
var getProducts = function (req, res, next) {
    //   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    product_1.Product.fetchAll(function (products) {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/products',
        });
    });
};
exports.getProducts = getProducts;
var getProduct = function (req, res, next) {
    //   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    var prodId = req.params.prodId;
    product_1.Product.findById(prodId, function (product) {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'Product Page',
            path: '/products',
        });
    });
};
exports.getProduct = getProduct;
var getIndex = function (req, res, next) {
    product_1.Product.fetchAll(function (products) {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Main Page',
            path: '/',
        });
    });
};
exports.getIndex = getIndex;
var getCart = function (req, res, next) {
    cart_1.Cart.getCart(function (cart) {
        product_1.Product.fetchAll(function (products) {
            var cartProductArr = [];
            products.reduce(function (cartsArr, p) {
                var cartData = cart.products.find(function (c) { return p.id === c.id; });
                if (cartData) {
                    cartsArr.push({ productData: p, qty: cartData.qty });
                }
                return cartsArr;
            }, cartProductArr);
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: cartProductArr || [],
            });
        });
    });
};
exports.getCart = getCart;
var postCart = function (req, res, next) {
    var prodId = req.body.prodId;
    product_1.Product.findById(prodId, function (prod) {
        cart_1.Cart.addProduct(prodId, prod.price);
    });
    res.redirect('/');
};
exports.postCart = postCart;
var postCartDeleteItem = function (req, res, next) {
    var prodId = req.body.prodId;
    console.log(prodId);
    product_1.Product.findById(prodId, function (prod) {
        console.log(prod);
        cart_1.Cart.deleteProduct(prodId, prod.price);
        res.redirect('/cart');
    });
};
exports.postCartDeleteItem = postCartDeleteItem;
var getOrders = function (req, res, next) {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
    });
};
exports.getOrders = getOrders;
var getCheckout = function (req, res, next) {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
};
exports.getCheckout = getCheckout;
