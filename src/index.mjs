import express, { Router } from 'express';
import cors from 'cors';
import customRouter from './routes/ingridient-router.mjs';
import beverageRouter from './routes/beverage-router.mjs';
import chefRouter from './routes/chef-router.mjs';
import userRouter from './routes/userRoute.mjs';
import authRouter from './routes/authRoute.mjs';
import { fileURLToPath } from 'url';
import path from 'path';
import {
  errorHandler,
  logger,
  notFoundHandler,
} from './middlewares/middlewares.mjs';
import orderRouter from './routes/orderRoute.mjs';
import hotdogRouter from './routes/hotdogRoute.mjs';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src'));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/css', express.static(path.join(__dirname, './css')));
app.use('/docs', express.static(path.join(__dirname, '../docs')));

// simple custom middleware for logging/debugging all requests
app.use(logger);

// router handlers
app.use('/api/custom', customRouter);
app.use('/api/', beverageRouter);
app.use('/api/menu', chefRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/order', orderRouter);
app.use('/api/hotdog', hotdogRouter);
app.use('/api/ingridients', customRouter);

// All others routes => 404
app.use(notFoundHandler);
// default error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
