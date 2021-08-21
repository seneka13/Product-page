"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProdFromFile = exports.pathGenerate = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var pathGenerate = function (dirname, filename) {
    return path_1.default.join(path_1.default.dirname(require.main.filename), dirname, filename);
};
exports.pathGenerate = pathGenerate;
var getProdFromFile = function (cb) {
    var p = exports.pathGenerate('data', 'products.json');
    fs_1.default.readFile(p, function (err, fileContent) {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent.toString()), p);
    });
};
exports.getProdFromFile = getProdFromFile;
