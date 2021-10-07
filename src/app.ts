import express from 'express';
import { adminRouter } from './routes/admin';
import shopRouter from './routes/shop';
import path from 'path';
import session from 'express-session';
import { get404 } from './controllers/404';
import { User } from './model/user';
import { authRouter } from './routes/auth';
import { DB_URI, MongoDb } from './utils/database';
import MongoStore from 'connect-mongo';
import csrf from 'csurf';

const app = express();
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

declare module 'express-session' {
  interface Session {
    [key: string]: any;
  }
}

app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: DB_URI,
      collectionName: 'session',
      stringify: false,
    }),
  })
);
app.use(csrfProtection);

app.use(async (req, res, next) => {
  try {
    if (!req.session.user?._id) {
      return next();
    }
    const user = await User.findById(req.session.user._id);
    //@ts-ignore
    req.user = user;
  } catch (error) {
    console.log(error);
  }

  next();
});

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use('/auth', authRouter);

app.use(get404);

MongoDb.start()
  .then(() => {
    app.listen(3000);
  })
  .catch(console.log);
