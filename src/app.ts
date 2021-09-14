import express from 'express';
import { adminRouter } from './routes/admin';
import shopRouter from './routes/shop';
import path from 'path';
import { get404 } from './controllers/404';
// import { User } from './model/user';
import { ModifiedRequest } from './types';
import { MongoDb } from './utils/database';
import { User } from './model/user';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(async (req: ModifiedRequest, res, next) => {
  try {
    const user = await User.findById('615068617c6a156bf19b113d');
    if (user) {
      req.user = new User(user.name, user.email, user.cart, user._id);
    }
    next();
  } catch (error) {
    console.log(error, 'errr');
  }
});

app.use(shopRouter);
app.use('/admin', adminRouter);
app.use(get404);

MongoDb.mongoConnect()
  .then(() => {
    app.listen(3000);
  })
  .catch(console.log);
