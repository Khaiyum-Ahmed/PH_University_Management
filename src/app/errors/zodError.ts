import { ZodError } from 'zod';
import { TerrorSources } from '../interface/error';

const handleZodError = (err: ZodError) => {
  const errorSources: TerrorSources = err.issues.map((issue) => {
    return {
      path: issue.path.length ? issue?.path[issue.path.length - 1] : 'unknown',
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
