import { Db, MongoClient, MongoClientOptions } from 'mongodb';

interface MongoOptions extends MongoClientOptions {
  useNewUrlParser: boolean;
}

export class MongoDb {
  static _db: Db;

  static async mongoConnect() {
    const uri =
      'mongodb+srv://seneka13:7u7NL3ex_!g2jUT@cluster0.qphd3.mongodb.net/onlineShop?retryWrites=true&w=majority';
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoOptions);
    try {
      await client.connect((err) => {
        if (err) {
          throw err;
        }
        this._db = client.db();
      });
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }

  static getDb() {
    if (this._db) {
      return this._db;
    }
    throw 'No database found!';
  }
}
