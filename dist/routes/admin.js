"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
var express_1 = __importDefault(require("express"));
var admin_1 = require("../controllers/admin");
var app = express_1.default();
exports.adminRouter = express_1.default.Router();
exports.adminRouter.get('/add-product', admin_1.addProducts);
exports.adminRouter.get('/products', admin_1.getProducts);
exports.adminRouter.post('/add-product', admin_1.productPosts);
