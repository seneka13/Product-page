"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckout = exports.getOrders = exports.postCartDeleteItem = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
var cart_1 = require("../model/cart");
var product_1 = require("../model/product");
var getProducts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allProducts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_1.Product.findAll()];
            case 1:
                allProducts = _a.sent();
                res.render('shop/product-list', {
                    pageTitle: 'Cart',
                    path: '/products',
                    prods: allProducts,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProducts = getProducts;
var getProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var prodId, product, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                prodId = req.params.prodId;
                return [4 /*yield*/, product_1.Product.findAll({ where: { id: prodId } })];
            case 1:
                product = (_a.sent())[0];
                res.render('shop/product-detail', {
                    product: product,
                    pageTitle: 'Product Page',
                    path: '/products',
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProduct = getProduct;
var getIndex = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allProducts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_1.Product.findAll()];
            case 1:
                allProducts = _a.sent();
                res.render('shop/index', {
                    pageTitle: 'Cart',
                    path: '/',
                    prods: allProducts,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getIndex = getIndex;
var getCart = function (req, res, next) {
    cart_1.Cart.getCart(function (cart) {
        product_1.Product.findAll()
            .then(function (_a) {
            var rows = _a[0], fieldData = _a[1];
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: rows || [],
            });
        })
            .catch(function (err) {
            console.log(err);
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
    product_1.Product.findByPk(prodId, function (prod) {
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
