"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProdFromFile = exports.pathGenerate = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pathGenerate = (dirname, filename) => path_1.default.join(path_1.default.dirname(require.main.filename), dirname, filename);
exports.pathGenerate = pathGenerate;
const getProdFromFile = (cb) => {
    const p = exports.pathGenerate('data', 'products.json');
    fs_1.default.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent.toString()), p);
    });
};
exports.getProdFromFile = getProdFromFile;
