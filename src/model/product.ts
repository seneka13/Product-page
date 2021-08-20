import fs from 'fs';
import { ProductType } from '../types';
import { getProdFromFile } from '../utils/utils';

const products: ProductType[] = [];

export class Product {
  id;
  constructor(
    public title: string,
    public price: number,
    public description: string,
    public imgUrl: string
  ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
    this.id = Date.now().toString();
  }
  save() {
    getProdFromFile((products: Product[], path: string) => {
      products.push(this);
      fs.writeFile(path, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb: any) {
    getProdFromFile(cb);
  }

  static findById(id: string, cb: any) {
    getProdFromFile((prod: Product[]) => {
      const product = prod.find((p) => p.id === id);
      cb(product);
    });
  }
}
