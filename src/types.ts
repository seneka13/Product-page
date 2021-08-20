import express from 'express';

export type RouterController = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

export interface ProductType {
  readonly id: string | number;
  title: string;
  price: number;
  description: string;
  imgUrl: string;
}
