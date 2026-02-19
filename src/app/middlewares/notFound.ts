import { NextFunction, Request, Response } from 'express';
import status from 'http-status';

const notFound = (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  return res.status(status.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
  });
};

export default notFound;
