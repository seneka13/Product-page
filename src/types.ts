import express from 'express';
import { Model, ModelCtor } from 'sequelize/types';

export type RouterController = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

export type CartItemType = {
  readonly id: string | number;
  qty: number;
};

export type CartType = {
  products: CartItemType[];
  totalPrice: number;
};
