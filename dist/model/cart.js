"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.CartItem = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database"));
exports.CartItem = database_1.default.define('cartItem', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: sequelize_1.DataTypes.INTEGER,
});
exports.Cart = database_1.default.define('cart', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});
