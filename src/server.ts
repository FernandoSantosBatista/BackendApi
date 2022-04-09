require('dotenv').config();
import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import './database';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(
  bodyParser.json({
    limit: '20mb',
  }),
);

app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    parameterLimit: 100000,
    extended: true,
  }),
);
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.log(err);
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000');
});
