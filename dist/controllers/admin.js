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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.postDeleteProduct = exports.postEditProduct = exports.editProduct = exports.postAddProduct = exports.addProduct = void 0;
const product_1 = __importDefault(require("../model/product"));
const addProduct = (req, res, next) => {
    //   res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/edit-product', {
        prods: [],
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};
exports.addProduct = addProduct;
const postAddProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, imgUrl, price, description } = req.body;
        const product = req.user.createProduct({
            title,
            imgUrl,
            price,
            description,
        });
        res.redirect('/admin/products');
    }
    catch (error) {
        console.log(error);
    }
});
exports.postAddProduct = postAddProduct;
const editProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const editMode = req.query.edit;
    const prodId = req.params.prodId;
    const product = yield req.user.getProducts({ where: { id: prodId } });
    if (!editMode || !product) {
        return res.redirect('/');
    }
    res.render('admin/edit-product', {
        product,
        pageTitle: 'Edit Product',
        path: '/admin/add-product',
        editing: editMode,
    });
});
exports.editProduct = editProduct;
const postEditProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { prodId, title, imgUrl, price, description } = req.body;
    try {
        const product = yield product_1.default.findByPk(prodId);
        product.title = title;
        product.imgUrl = imgUrl;
        product.price = price;
        product.description = description;
        yield (product === null || product === void 0 ? void 0 : product.save());
        res.redirect('/admin/products');
    }
    catch (error) {
        console.log(error);
    }
});
exports.postEditProduct = postEditProduct;
const postDeleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { prodId } = req.body;
    yield product_1.default.destroy({ where: { id: prodId } });
    //   await product?.destroy();
    res.redirect('/admin/products');
});
exports.postDeleteProduct = postDeleteProduct;
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield req.user.getProducts();
    res.render('admin/products', {
        prods: products || [],
        pageTitle: 'Admin Products',
        path: '/admin/products',
    });
});
exports.getProducts = getProducts;
