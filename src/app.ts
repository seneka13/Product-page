import express from 'express';
import { adminRouter } from './routes/admin';
import shopRouter from './routes/shop';
import path from 'path';
import { get404 } from './controllers/404';
import sqlize from './utils/database';
import Product from './model/product';
import { User } from './model/user';
import { ModifiedRequest } from './types';
import { Cart, CartItem } from './model/cart';
import { Order, OrderItem } from './model/order';

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(async (req: ModifiedRequest, res, next) => {
  try {
    const user = await User.findByPk(1);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});

app.use(shopRouter);
app.use('/admin', adminRouter);

app.use(get404);

User.hasMany(Product);
User.hasOne(Cart);
User.hasMany(Order);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });

sqlize
  .sync()
  .then(async (result) => {
    const user = await User.findByPk(1);
    if (!user) {
      return await User.create({ name: 'Sam', email: 'test@mail.ru' });
    }

    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
