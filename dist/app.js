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
const express_1 = __importDefault(require("express"));
const admin_1 = require("./routes/admin");
const shop_1 = __importDefault(require("./routes/shop"));
const path_1 = __importDefault(require("path"));
const _404_1 = require("./controllers/404");
const database_1 = __importDefault(require("./utils/database"));
const product_1 = __importDefault(require("./model/product"));
const user_1 = require("./model/user");
const cart_1 = require("./model/cart");
const order_1 = require("./model/order");
const app = express_1.default();
app.set('view engine', 'ejs');
app.use(express_1.default.urlencoded());
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findByPk(1);
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
    }
}));
app.use(shop_1.default);
app.use('/admin', admin_1.adminRouter);
app.use(_404_1.get404);
user_1.User.hasMany(product_1.default);
user_1.User.hasOne(cart_1.Cart);
user_1.User.hasMany(order_1.Order);
cart_1.Cart.belongsTo(user_1.User);
cart_1.Cart.belongsToMany(product_1.default, { through: cart_1.CartItem });
product_1.default.belongsTo(user_1.User, { constraints: true, onDelete: 'CASCADE' });
product_1.default.belongsToMany(cart_1.Cart, { through: cart_1.CartItem });
order_1.Order.belongsTo(user_1.User);
order_1.Order.belongsToMany(product_1.default, { through: order_1.OrderItem });
database_1.default
    .sync()
    .then((result) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findByPk(1);
    if (!user) {
        return yield user_1.User.create({ name: 'Sam', email: 'test@mail.ru' });
    }
    return user;
}))
    .then((user) => {
    return user.createCart();
})
    .then((cart) => {
    app.listen(3000);
})
    .catch((err) => console.log(err));
