import express from 'express';
import adminRouter from './routes/admin';
import shopRouter from './routes/shop';
import authRouter from './routes/auth';
import path from 'path';
import session from './middleware/session';
import { get404, get500 } from './controllers/error';
import { User } from './model/user';
import { MongoDb } from './utils/database';
import csrf from 'csurf';
import { setLocalCsrf } from './middleware/setCsrf';
import flash from 'connect-flash';
import multer from 'multer';
import { ErrorHandler } from './types';
import fs from 'fs';

const app = express();
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'images'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(
  multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/jpeg') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  }).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
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
  } catch (error: any) {
    throw new Error(error);
  }

  next();
});

app.use(setLocalCsrf);

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use('/auth', authRouter);

app.get('/500', get500);
app.use(get404);

const errorHandling: ErrorHandler = (err, req, res, next) => {
  res.redirect('/500');
};

app.use(errorHandling);

MongoDb.start()
  .then(() => {
    app.listen(3000);
  })
  .catch(console.log);
