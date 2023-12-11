import 'express-async-errors';
import express, { json } from 'express';
import cors from 'cors';
import { accountRouter } from './routers/accounts-router.js';
import { transactionRouter } from './routers/transactions-router.js';
import { handleApplicationErrors } from './middlewares/error-handling-middleware.js';
import { connectDb } from './config/database.js';

const app = express();
const PORT = process.env.PORT;

app
  .use(cors())
  .use(json())
  .use('/accounts', accountRouter)
  .use('/transactions', transactionRouter)
  .use(handleApplicationErrors);

export function init() {
  connectDb();
  return Promise.resolve(app);
}

export default app;
