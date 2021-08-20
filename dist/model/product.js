"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var fs_1 = __importDefault(require("fs"));
var utils_1 = require("../utils/utils");
var products = [];
var Product = /** @class */ (function () {
    function Product(title, price, description, imgUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imgUrl = imgUrl;
        this.title = title;
        this.price = price;
        this.description = description;
        this.imgUrl = imgUrl;
        this.id = Date.now().toString();
    }
    Product.prototype.save = function () {
        var _this = this;
        utils_1.getProdFromFile(function (products, path) {
            products.push(_this);
            fs_1.default.writeFile(path, JSON.stringify(products), function (err) {
                console.log(err);
            });
        });
    };
    Product.fetchAll = function (cb) {
        utils_1.getProdFromFile(cb);
    };
    Product.findById = function (id, cb) {
        utils_1.getProdFromFile(function (prod) {
            var product = prod.find(function (p) { return p.id === id; });
            cb(product);
        });
    };
    return Product;
}());
exports.Product = Product;
