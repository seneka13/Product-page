import fs from 'fs';
import { ProductType } from '../types';
import { getProdFromFile } from '../utils/utils';
import { Cart } from './cart';

const products: ProductType[] = [];

export class Product {
  constructor(
    public title: string,
    public price: number,
    public description: string,
    public imgUrl: string,
    public id: string | null
  ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
    this.id = id;
  }
  save() {
    getProdFromFile((products: Product[], path: string) => {
      if (this.id) {
        const existingProductindex = products.findIndex((prod) => prod.id === this.id)!;
        const updatedProducts = [...products];
        updatedProducts[existingProductindex] = this;
        fs.writeFile(path, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Date.now().toString();
        products.push(this);
        fs.writeFile(path, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb: any) {
    getProdFromFile(cb);
  }

  static findById(id: string, cb: any) {
    console.log(id);
    getProdFromFile((prod: Product[]) => {
      const product = prod.find((p) => p.id === id);
      cb(product);
    });
  }

  static deleteById(id: string) {
    console.log(id);
    getProdFromFile((prod: Product[], path: string) => {
      const updatedProducts = prod.filter((p) => p.id !== id);
      const product = prod.find((p) => p.id === id);
      fs.writeFile(path, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product!.price);
        }
      });
    });
  }
}
