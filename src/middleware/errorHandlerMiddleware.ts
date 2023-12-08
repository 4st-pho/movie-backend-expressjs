import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';

export const mongoErrorHandler = (error: MongoError, req: Request, res: Response, next: NextFunction) => {
  let anyError = error as any
  var errors : Record<string, any> = {}
  var errorMessage: string

  if (error.code == 11000) {
    errorMessage = Object.keys(anyError.keyValue)[0] + " already exists.";
    return res.status(400).json({ message: errorMessage });
  }

  if (error.name === 'ValidationError') {
    Object.keys(anyError.errors).forEach((key) => {
      errors[key] = anyError.errors[key].message
    });
    return res.status(400).json({message: error.message, errors});
  }
  return res.status(400).json({error, message: error.message});
};

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ message: 'Internal Server Error'});
};