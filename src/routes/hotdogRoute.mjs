import express from 'express';
import { body } from 'express-validator';
import {
  getCustomerHotdogs,
  getHotdogToppings,
  getMenuHotdogs,
  postHotdogs,
  postHotdogsToppings,
  postManyHotdogsToppings,
} from '../controllers/hotdogController.mjs';
import { getOrdersHotdogs } from '../controllers/orderController.mjs';

const hotdogRouter = express.Router();

hotdogRouter
  .route('/')
  .post(
    body('hotdog_name').trim().isAlphanumeric(),
    body('base_price').isNumeric(),
    postHotdogs
  );
hotdogRouter
  .route('/hotdogToppings')
  .post(
    body('hotdog_id').isNumeric(),
    body('topping_id').isNumeric(),
    postHotdogsToppings
  ); // TODO: is this necessary
hotdogRouter.route('/manyHotdogToppings').post(postManyHotdogsToppings);

hotdogRouter.route('/hotdogToppings/:id').get(getHotdogToppings);

hotdogRouter.route('/menu').get(getMenuHotdogs);
hotdogRouter.route('/customer').get(getCustomerHotdogs);

export default hotdogRouter;
