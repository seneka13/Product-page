"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// const Sequelize = require('sequelize')
const sequelize = new sequelize_1.Sequelize('nodejs', 'root', 'seneka130293', {
    dialect: 'mysql',
    host: 'localhost',
});
exports.default = sequelize;
