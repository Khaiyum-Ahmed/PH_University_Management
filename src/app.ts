import express, { Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import { Application } from 'express';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();
// parser
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/v1', router);

// test
const test = (req: Request, res: Response) => {
  res.send('Hello World!');
};
app.get('/', test);

app.use(globalErrorHandler);
// Not found
app.use(notFound);
export default app;
