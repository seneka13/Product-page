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
exports.getProducts = exports.postDeleteProduct = exports.postEditProduct = exports.editProduct = exports.postAddProduct = exports.addProduct = void 0;
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
var postAddProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, imgUrl, price, description, product, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, imgUrl = _a.imgUrl, price = _a.price, description = _a.description;
                return [4 /*yield*/, product_1.Product.create({ title: title, imgUrl: imgUrl, price: price, description: description })];
            case 1:
                product = _b.sent();
                res.redirect('/admin/products');
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.postAddProduct = postAddProduct;
var editProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var editMode, prodId, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                editMode = req.query.edit;
                prodId = req.params.prodId;
                return [4 /*yield*/, product_1.Product.findByPk(prodId)];
            case 1:
                product = _a.sent();
                if (!editMode || !product) {
                    return [2 /*return*/, res.redirect('/')];
                }
                res.render('admin/edit-product', {
                    product: product,
                    pageTitle: 'Edit Product',
                    path: '/admin/add-product',
                    editing: editMode,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.editProduct = editProduct;
var postEditProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, prodId, title, imgUrl, price, description, product, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, prodId = _a.prodId, title = _a.title, imgUrl = _a.imgUrl, price = _a.price, description = _a.description;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, product_1.Product.findByPk(prodId)];
            case 2:
                product = _b.sent();
                product.title = title;
                product.imgUrl = imgUrl;
                product.price = price;
                product.description = description;
                return [4 /*yield*/, (product === null || product === void 0 ? void 0 : product.save())];
            case 3:
                _b.sent();
                res.redirect('/admin/products');
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.postEditProduct = postEditProduct;
var postDeleteProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var prodId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prodId = req.body.prodId;
                return [4 /*yield*/, product_1.Product.destroy({ where: { id: prodId } })];
            case 1:
                _a.sent();
                //   await product?.destroy();
                res.redirect('/admin/products');
                return [2 /*return*/];
        }
    });
}); };
exports.postDeleteProduct = postDeleteProduct;
var getProducts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_1.Product.findAll()];
            case 1:
                products = _a.sent();
                res.render('admin/products', {
                    prods: products || [],
                    pageTitle: 'Admin Products',
                    path: '/admin/products',
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getProducts = getProducts;
