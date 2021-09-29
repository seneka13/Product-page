import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// export interface ProductType {
//   readonly _id?: ObjectId;
//   title: string;
//   price: number;
//   description: string;
//   imgUrl: string;
//   readonly userId?: string;
// }

// class Product implements ProductType {
//   public _id;
//   public title;
//   public price;
//   public description;
//   public imgUrl;
//   userId;
//   constructor(
//     title: string,
//     price: number,
//     description: string,
//     imgUrl: string,
//     userId?: string,
//     id?: ObjectId
//   ) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imgUrl = imgUrl;
//     this._id = id && new ObjectId(id);
//     this.userId = userId;
//   }

//   save() {
//     let dbOb;
//     const db = MongoDb.getDb();
//     if (this._id) {
//       dbOb = db.collection('products').updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOb = db.collection('products').insertOne(this);
//     }

//     return dbOb
//       .then((data) => {
//         console.log(data, 'success');
//       })
//       .catch(console.error);
//   }

//   static fetchAll() {
//     const db = MongoDb.getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then((products) => {
//         return products;
//       })
//       .catch(console.error);
//   }

//   static getById(id: any) {
//     const db = MongoDb.getDb();
//     return db
//       .collection('products')
//       .findOne({ _id: new ObjectId(id) })
//       .then((product) => {
//         return product;
//       })
//       .catch(console.error);
//   }

//   static deleteById(id: any) {
//     const db = MongoDb.getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new ObjectId(id) })
//       .then((product) => {
//         console.log('Deleted');
//       })
//       .catch(console.error);
//   }
// }

// // Product.init(
// //   {
// //     id: {
// //       type: DataTypes.INTEGER,
// //       autoIncrement: true,
// //       allowNull: false,
// //       primaryKey: true,
// //     },
// //     title: DataTypes.STRING,
// //     price: {
// //       type: DataTypes.DOUBLE,
// //       allowNull: false,
// //     },
// //     imgUrl: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //     description: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //   },
// //   { sequelize, modelName: 'product' }
// // );

// export default Product;

// // export const Product = sequelize.define<ProductType>('product', {
// //   id: {
// //     type: DataTypes.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true,
// //   },
// //   title: DataTypes.STRING,
// //   price: {
// //     type: DataTypes.DOUBLE,
// //     allowNull: false,
// //   },
// //   imgUrl: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //   },
// //   description: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //   },
// // });
