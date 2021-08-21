"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
var fs_1 = __importDefault(require("fs"));
var utils_1 = require("../utils/utils");
var p = utils_1.pathGenerate('data', 'cart.json');
var Cart = /** @class */ (function () {
    function Cart() {
    }
    Cart.addProduct = function (id, price) {
        fs_1.default.readFile(p, function (err, fileContent) {
            var cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent.toString());
            }
            var existingProductindex = cart.products.findIndex(function (prod) { return prod.id === id; });
            var existingProduct = cart.products[existingProductindex];
            var updatedProduct;
            if (existingProduct) {
                updatedProduct = __assign({}, existingProduct);
                updatedProduct.qty += 1;
                cart.products[existingProductindex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = __spreadArray(__spreadArray([], cart.products), [updatedProduct]);
            }
            cart.totalPrice = Number(cart.totalPrice) + Number(price);
            fs_1.default.writeFile(p, JSON.stringify(cart), function (err) { return console.log(err); });
        });
    };
    Cart.deleteProduct = function (id, price) {
        fs_1.default.readFile(p, function (err, fileContent) {
            if (err) {
                return;
            }
            var cart = JSON.parse(fileContent.toString());
            var updatedCart = __assign({}, cart);
            var product = updatedCart.products.find(function (p) { return p.id === id; });
            var productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(function (prod) { return prod.id !== id; });
            updatedCart.totalPrice = cart.totalPrice - price * productQty;
            fs_1.default.writeFile(p, JSON.stringify(updatedCart), function (err) { return console.log(err); });
        });
    };
    Cart.getCart = function (cb) {
        fs_1.default.readFile(p, function (err, fileContent) {
            if (err) {
                return cb(null);
            }
            var cart = JSON.parse(fileContent.toString());
            cb(cart);
        });
    };
    return Cart;
}());
exports.Cart = Cart;
