/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statuscode = 500;
  const message = err.message || 'something went Wrong!';
  return res.status(statuscode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
