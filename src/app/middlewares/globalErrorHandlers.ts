/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TerrorSources } from '../interface/error';
import { ZodIssue } from 'zod/v3';
import config from '../config';
import handleZodError from '../errors/zodError';
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'something went Wrong!';

  let errorSources: TerrorSources = [
    {
      path: '',
      message: 'something went Wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  // Ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
    // myerror: err,
  });
};

export default globalErrorHandler;

// pattern
/**
 * success
 * message
 * errorSources:[
 * path:"",
 * message:""
 * ]
 * stack
 */
