"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var fs_1 = __importDefault(require("fs"));
var utils_1 = require("../utils/utils");
var cart_1 = require("./cart");
var products = [];
var Product = /** @class */ (function () {
    function Product(title, price, description, imgUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imgUrl = imgUrl;
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.imgUrl = imgUrl;
        this.id = id;
    }
    Product.prototype.save = function () {
        var _this = this;
        utils_1.getProdFromFile(function (products, path) {
            if (_this.id) {
                var existingProductindex = products.findIndex(function (prod) { return prod.id === _this.id; });
                var updatedProducts = __spreadArray([], products);
                updatedProducts[existingProductindex] = _this;
                fs_1.default.writeFile(path, JSON.stringify(updatedProducts), function (err) {
                    console.log(err);
                });
            }
            else {
                _this.id = Date.now().toString();
                products.push(_this);
                fs_1.default.writeFile(path, JSON.stringify(products), function (err) {
                    console.log(err);
                });
            }
        });
    };
    Product.fetchAll = function (cb) {
        utils_1.getProdFromFile(cb);
    };
    Product.findById = function (id, cb) {
        console.log(id);
        utils_1.getProdFromFile(function (prod) {
            var product = prod.find(function (p) { return p.id === id; });
            cb(product);
        });
    };
    Product.deleteById = function (id) {
        console.log(id);
        utils_1.getProdFromFile(function (prod, path) {
            var updatedProducts = prod.filter(function (p) { return p.id !== id; });
            var product = prod.find(function (p) { return p.id === id; });
            fs_1.default.writeFile(path, JSON.stringify(updatedProducts), function (err) {
                if (!err) {
                    cart_1.Cart.deleteProduct(id, product.price);
                }
            });
        });
    };
    return Product;
}());
exports.Product = Product;
