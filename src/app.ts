import express from 'express';
import adminRouter from './routes/admin';
import shopRouter from './routes/shop';
import authRouter from './routes/auth';
import path from 'path';
import session from './middleware/session';
import { get404 } from './controllers/404';
import { User } from './model/user';
import { MongoDb } from './utils/database';
import csrf from 'csurf';
import { setLocalCsrf } from './middleware/setCsrf';
import flash from 'connect-flash';

const app = express();
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, 'public')));
console.log(session);
app.use(session);
app.use(csrfProtection);
app.use(flash());

app.use(async (req, res, next) => {
  try {
    if (!req.session.user?._id) {
      return next();
    }
    const user = await User.findById(req.session.user._id);
    //@ts-ignore
    req.user = user;
  } catch (error) {
    console.log(error, "middle");
  }

  next();
});

app.use(setLocalCsrf);

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use('/auth', authRouter);

app.use(get404);

MongoDb.start()
  .then(() => {
    app.listen(3000);
  })
  .catch(console.log);
