import express from 'express';

export interface ModifiedRequest extends express.Request {
  user?: any;
}

export type RouterController = (
  req: ModifiedRequest,
  res: express.Response,
  next: express.NextFunction
) => void;

class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export type ErrorHandler = (
  error: HttpException,
  req: ModifiedRequest,
  res: express.Response,
  next: express.NextFunction
) => void;
