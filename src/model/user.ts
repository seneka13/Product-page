// import { DataTypes } from 'sequelize';
// import { CartType } from '../types';

import { ObjectId } from 'bson';
import { MongoDb } from '../utils/database';
import Product from './product';

interface UserCart {
  items: {
    prodId: ObjectId;
    quantity: number;
  }[];
}

export interface UserType {
  readonly _id: ObjectId;
  name: string;
  email: string;
  cart: UserCart;
}

export class User implements UserType {
  _id: ObjectId;
  constructor(public name: string, public email: string, public cart: UserCart, id: string) {
    this.name = name;
    this.email = email;
    this._id = new ObjectId(id);
    this.cart = cart;
  }

  save() {
    try {
      const db = MongoDb.getDb();
      return db.collection('users').insertOne(this);
    } catch (error) {
      console.error(error);
    }
  }

  static findById(userId: any) {
    const db = MongoDb.getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }

  addToCart(product: Product) {
    const cartProductIndex = this.cart.items.findIndex(
      (cp) => this.cart.items && String(cp.prodId) === String(product._id)
    );
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({ prodId: new ObjectId(product._id), quantity: newQuantity });
    }
    try {
      const db = MongoDb.getDb();
      db.collection('users').updateOne(
        { _id: this._id },
        { $set: { cart: { items: updatedCartItems } } }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async getCart() {
    const db = MongoDb.getDb();
    const products = await db
      .collection('products')
      .find({ _id: { $in: [...this.cart.items.map((p) => p.prodId)] } })
      .toArray();

    return products.map((p) => ({
      ...p,
      quantity: this.cart.items.find((i) => String(i.prodId) === String(p._id))?.quantity,
    }));
  }

  async deleteCart(prodId: ObjectId) {
    const updatedCartItems = this.cart.items.filter((i) => String(i.prodId) !== String(prodId));
    try {
      const db = MongoDb.getDb();
      db.collection('users').updateOne(
        { _id: this._id },
        { $set: { cart: { items: updatedCartItems } } }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async addOrder() {
    const db = MongoDb.getDb();
    const products = await this.getCart();
    const order = {
      items: products,
      user: {
        _id: new ObjectId(this._id),
        name: this.name,
      },
    };
    await db.collection('orders').insertOne(order);
    this.cart = { items: [] };
    await db
      .collection('users')
      .updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: { items: [] } } });
  }

  getOrders() {
    const db = MongoDb.getDb();
    return db
      .collection('orders')
      .find({ 'user._id': new ObjectId(this._id) })
      .toArray();
  }
}
