import express from 'express';

export type RouterController = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

export type ProductType = {
  readonly id: string | number;
  title: string;
  price: number;
  description: string;
  imgUrl: string;
};

export type CartItemType = {
  readonly id: string | number;
  qty: number;
};

export type CartType = {
  products: CartItemType[];
  totalPrice: number;
};
