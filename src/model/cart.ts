import fs from 'fs';
import path from 'path';
import { CartItemType, CartType, ProductType } from '../types';
import { pathGenerate } from '../utils/utils';

const p = pathGenerate('data', 'cart.json');

export class Cart {
  static addProduct(id: string | number, price: number) {
    fs.readFile(p, (err, fileContent) => {
      let cart: CartType = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent.toString());
      }
      const existingProductindex = cart.products.findIndex((prod) => prod.id === id)!;
      const existingProduct = cart.products[existingProductindex];
      let updatedProduct: CartItemType;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products[existingProductindex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = Number(cart.totalPrice) + Number(price);
      fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static deleteProduct(id: string | number, price: number) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      let cart: CartType = JSON.parse(fileContent.toString());
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((p) => p.id === id);
      const productQty = product!.qty;
      updatedCart.products = updatedCart.products.filter((prod) => prod.id !== id);
      updatedCart.totalPrice = cart.totalPrice - price * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => console.log(err));
    });
  }

  static getCart(cb: any) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cb(null);
      }
      let cart: CartType = JSON.parse(fileContent.toString());
      cb(cart);
    });
  }
}
