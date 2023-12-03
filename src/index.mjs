import express, { Router } from 'express';
import cors from 'cors';
import customRouter from './routes/ingridient-router.mjs';
import beverageRouter from './routes/beverage-router.mjs';
import chefRouter from './routes/chef-router.mjs';
import userRouter from './routes/userRoute.mjs';
import authRouter from './routes/authRoute.mjs';
import {
  errorHandler,
  logger,
  notFoundHandler,
} from './middlewares/middlewares.mjs';

const app = express();
const port = 3000;

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple custom middleware for logging/debugging all requests
app.use(logger);

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api/custom', customRouter);
app.use('/api/', beverageRouter);
app.use('/api/menu', chefRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// All others routes => 404
app.use(notFoundHandler);
// default error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
