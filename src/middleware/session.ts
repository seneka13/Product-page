import session from 'express-session';
import MongoStore from 'connect-mongo';
import { DB_URI } from '../utils/database';

declare module 'express-session' {
  interface Session {
    [key: string]: any;
  }
}

export default session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: DB_URI,
    collectionName: 'session',
    stringify: false,
  }),
});
