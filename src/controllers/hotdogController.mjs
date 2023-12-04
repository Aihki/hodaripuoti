import {
  addHotDog,
  addHotDogToppings,
  addManyHotDogToppings,
  listAllCustomerHotdogs,
  listAllMenuHotdogs,
  listHotdogToppings,
} from '../models/hotdogModel.mjs';
import { addOrder } from '../models/orderModel.mjs';

/**
 * Get all users
 *
 * @param {object} req
 * @param {object} res
 */
const getMenuHotdogs = async (req, res) => {
  try {
    const menuHotdogs = await listAllMenuHotdogs();
    if (menuHotdogs.length < 1) {
      res.status(404).json({ message: 'No menu hotdogs found!' });
      return;
    }
    res.json(menuHotdogs);
  } catch (e) {
    console.error('getMenuHotdogs', e.message);
  }
};

const getCustomerHotdogs = async (req, res) => {
  try {
    const customerHotdogs = await listAllCustomerHotdogs();
    if (customerHotdogs.length < 1) {
      res.status(404).json({ message: 'No customer hotdogs found!' });
      return;
    }
    res.json(customerHotdogs);
  } catch (e) {
    console.error('getCustomerHotdogs', e.message);
  }
};

const postHotdogs = async (req, res, next) => {
  const hotdog_id = await addHotDog(req.body);
  // order is undefined
  if (!hotdog_id) {
    const error = new Error('Could not add hotdog');
    error.status = 401;
    return next(error);
  }
  // db error in model
  if (hotdog_id.error) {
    return next(new Error(hotdog_id.error));
  }

  console.log('postHotdogs', hotdog_id);
  res.status(201).json({ message: 'Hotdog added', hotdog_id });
};

const postHotdogsToppings = async (req, res, next) => {
  const hotdogToppings = await addHotDogToppings(req.body);
  // order is undefined
  if (!hotdogToppings) {
    const error = new Error('Could not add to hotdogToppings');
    error.status = 401;
    return next(error);
  }
  // db error in model
  if (hotdogToppings.error) {
    return next(new Error(hotdogToppings.error));
  }

  console.log('postHotdogsToppings', hotdogToppings);
  res.status(201).json({ message: 'HotdogToppings added', hotdogToppings });
};
const postManyHotdogsToppings = async (req, res, next) => {
  const { hotdog_id, topping_ids } = req.body;
  try {
    const hotdogToppings = await addManyHotDogToppings(hotdog_id, topping_ids);

    if (!hotdogToppings || hotdogToppings.error) {
      const error = new Error('Could not add many hotdogToppings');
      error.status = 401;
      return next(error);
    }

    console.log('postManyHotdogsToppings', hotdogToppings);
    res
      .status(201)
      .json({ message: 'Many HotdogToppings added', hotdogToppings });
  } catch (error) {
    console.error('Error adding many hotdogToppings:', error.message);
    return next(error);
  }
};

const getHotdogToppings = async (req, res) => {
  try {
    const hotdogToppings = await listHotdogToppings(req.params.id);
    if (hotdogToppings.length < 1) {
      res.status(404).json({ message: 'No hotdog toppings found!' });
      return;
    }
    res.json(hotdogToppings);
  } catch (e) {
    console.error('getHotdogToppings', e.message);
  }
};

export {
  getMenuHotdogs,
  getCustomerHotdogs,
  postHotdogs,
  postHotdogsToppings,
  getHotdogToppings,
  postManyHotdogsToppings,
};
