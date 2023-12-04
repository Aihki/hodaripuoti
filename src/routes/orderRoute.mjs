import express from 'express';
import { body } from 'express-validator';
import {
  getOrders,
  getOrdersHotdogs,
  postOrders,
  postOrdersHotdogs,
  putOrderTotalPrice,
} from '../controllers/orderController.mjs';

const orderRouter = express.Router();

orderRouter
  .route('/')
  .get(getOrders)
  .post(
    body('user_id').isNumeric(),
    body('total_price').isNumeric(),
    postOrders
  );

orderRouter
  .route('/orderHotdogs')
  .get(getOrdersHotdogs)
  .post(
    body('order_id').isNumeric(),
    body('hotdog_id').isNumeric(),
    body('amount').isNumeric(),
    postOrdersHotdogs
  );
orderRouter.route('/orderHotdogs/:id').get(getOrdersHotdogs);
orderRouter.route('/orderTotalPrice/:id').put(putOrderTotalPrice);

export default orderRouter;
