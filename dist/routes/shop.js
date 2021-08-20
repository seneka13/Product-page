"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var shop_1 = require("../controllers/shop");
var router = express_1.default.Router();
router.get('/', shop_1.getIndex);
router.get('/products', shop_1.getProducts);
router.get('/products/:prodId', shop_1.getProduct);
router.get('/cart', shop_1.getCart);
router.post('/cart', shop_1.postCart);
router.get('/orders', shop_1.getOrders);
router.get('/checkout', shop_1.getCart);
exports.default = router;
