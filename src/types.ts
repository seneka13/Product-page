import express from 'express';

export interface ModifiedRequest extends express.Request {
  user?: any;
}

export type RouterController = (
  req: ModifiedRequest,
  res: express.Response,
  next: express.NextFunction
) => void;
