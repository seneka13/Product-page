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
exports.getOrders = exports.postOrder = exports.postCartDeleteItem = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../model/product"));
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    try {
        const allProducts = yield product_1.default.findAll();
        res.render('shop/product-list', {
            pageTitle: 'Cart',
            path: '/products',
            prods: allProducts,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    try {
        const prodId = req.params.prodId;
        const [product] = yield product_1.default.findAll({ where: { id: prodId } });
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'Product Page',
            path: '/products',
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProduct = getProduct;
const getIndex = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield product_1.default.findAll();
        res.render('shop/index', {
            pageTitle: 'Cart',
            path: '/',
            prods: allProducts,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getIndex = getIndex;
const getCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield req.user.getCart();
        const products = yield cart.getProducts();
        res.render('shop/cart', {
            pageTitle: 'Cart',
            path: '/cart',
            products,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCart = getCart;
const postCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const prodId = req.body.prodId;
    const cart = yield req.user.getCart();
    const products = yield cart.getProducts({ where: { id: prodId } });
    const product = products.length > 0 && products[0];
    let newQuantity = 1;
    if (product) {
        const oldQty = (_a = product.cartItem) === null || _a === void 0 ? void 0 : _a.quantity;
        newQuantity = oldQty + 1;
        yield cart.addProduct(product, {
            through: { quantity: newQuantity },
        });
        res.redirect('/');
        return;
    }
    const originProduct = yield product_1.default.findByPk(prodId);
    yield cart.addProduct(originProduct, {
        through: { quantity: newQuantity },
    });
    res.redirect('/');
});
exports.postCart = postCart;
const postCartDeleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prodId = req.body.prodId;
        const cart = yield req.user.getCart();
        const products = yield cart.getProducts({ where: { id: prodId } });
        const product = products[0];
        product.cartItem.destroy();
        res.redirect('/cart');
    }
    catch (error) {
        console.log(error);
    }
});
exports.postCartDeleteItem = postCartDeleteItem;
const postOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield req.user.getCart();
    const products = yield cart.getProducts();
    const order = yield req.user.createOrder();
    yield order.addProducts(products.map((p) => {
        p.orderItem = { quantity: p.cartItem.quantity };
        return p;
    }));
    yield cart.setProducts(null);
    res.redirect('/orders');
});
exports.postOrder = postOrder;
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield req.user.getOrders({ include: ['products'] });
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
        orders,
    });
});
exports.getOrders = getOrders;
