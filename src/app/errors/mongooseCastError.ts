import mongoose from 'mongoose';
import { TerrorSources, TGenericErrorResponse } from '../interface/error';

const handleMongooseCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TerrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID ',
    errorSources,
  };
};
export default handleMongooseCastError;
