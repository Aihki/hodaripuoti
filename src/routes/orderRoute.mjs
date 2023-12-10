import express from 'express';
import { body } from 'express-validator';
import {
  getFilteredOrders,
  getHotdogsAndToppings,
  getMyOrders,
  getOrderById,
  getOrders,
  getOrdersCounts,
  getOrdersHotdogs,
  getOrderTotalPrice,
  postOrders,
  postOrdersHotdogs,
  putOrderStatus,
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
orderRouter.route('/ordersCounts').get(getOrdersCounts);
orderRouter.route('/getMyOrders/:id').get(getMyOrders);
orderRouter.route('/:id').get(getOrderById);
orderRouter.route('/changeOrderStatus').put(putOrderStatus);
orderRouter.route('/getFilteredOrders/:id').get(getFilteredOrders);

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
orderRouter.route('/hotdogsAndToppings/:id').get(getHotdogsAndToppings);
orderRouter.route('/orderTotalPrice/:id').get(getOrderTotalPrice);
orderRouter.route('/orderTotalPrice').put(putOrderTotalPrice);

export default orderRouter;
