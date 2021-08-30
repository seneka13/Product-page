import express from 'express';

export interface ModifiedRequest extends express.Request {
  user?: any;
}

export type RouterController = (
  req: ModifiedRequest,
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
