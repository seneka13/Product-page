"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var admin_1 = require("./routes/admin");
var shop_1 = __importDefault(require("./routes/shop"));
var path_1 = __importDefault(require("path"));
var _404_1 = require("./controllers/404");
var app = express_1.default();
app.set('view engine', 'ejs');
app.use(express_1.default.urlencoded());
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
app.use(shop_1.default);
app.use('/admin', admin_1.adminRouter);
app.use(_404_1.get404);
app.listen(3000);
