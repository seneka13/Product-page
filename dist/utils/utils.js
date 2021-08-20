"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProdFromFile = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var getProdFromFile = function (cb) {
    var p = path_1.default.join(path_1.default.dirname(require.main.filename), 'data', 'products.json');
    fs_1.default.readFile(p, function (err, fileContent) {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent.toString()), p);
    });
};
exports.getProdFromFile = getProdFromFile;
