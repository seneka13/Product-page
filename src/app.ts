import express from 'express';
// import { adminRouter } from './routes/admin';
// import shopRouter from './routes/shop';
import path from 'path';
import { get404 } from './controllers/404';
// import { User } from './model/user';
import { ModifiedRequest } from './types';
import mongoose from 'mongoose';
// import { User } from './model/user';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, 'public')));
// app.use(async (req: ModifiedRequest, res, next) => {
//   try {
//     const user = await User.findById('615068617c6a156bf19b113d');
//     if (user) {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//     }
//     next();
//   } catch (error) {
//     console.log(error, 'errr');
//   }
// });

// app.use(shopRouter);
// app.use('/admin', adminRouter);
app.use(get404);

mongoose
  .connect(
    'mongodb+srv://seneka13:7u7NL3ex_!g2jUT@cluster0.qphd3.mongodb.net/onlineShop?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('coneccted');
    app.listen(3000);
  })
  .catch(console.log);
