"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderItem = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database"));
exports.OrderItem = database_1.default.define('orderItem', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: sequelize_1.DataTypes.INTEGER,
});
exports.Order = database_1.default.define('order', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});
