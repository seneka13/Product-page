import mongoose from 'mongoose';

export const DB_URI =
  'mongodb+srv://seneka13:7u7NL3ex_!g2jUT@cluster0.qphd3.mongodb.net/onlineShop';

export class MongoDb {
  static async start() {
    return await mongoose.connect(DB_URI);
  }
}
