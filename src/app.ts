import express from 'express';
import { adminRouter } from './routes/admin';
import shopRouter from './routes/shop';
import path from 'path';
import { get404 } from './controllers/404';
import sqlize from './utils/database';

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(shopRouter);
app.use('/admin', adminRouter);

app.use(get404);

sqlize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
