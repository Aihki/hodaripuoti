import {
  addOrder,
  addOrderHotdogs,
  listAllOrders,
  listFilteredOrders,
  listHotdogPrices,
  listMyOrders,
  listOrderById,
  listOrderHotdogs,
  listOrderHotdogsAndToppings,
  listOrdersCounts,
  updateOrderStatus,
  updateOrderTotalPrice,
} from '../models/orderModel.mjs';

/**
 * Get all users
 *
 * @param {object} req
 * @param {object} res
 */
const getOrders = async (req, res) => {
  try {
    const orders = await listAllOrders();
    if (orders.length < 1) {
      res.status(404).json({ message: 'No orders found!' });
      return;
    }
    res.json(orders);
  } catch (e) {
    console.error('getOrders', e.message);
  }
};
const getOrderById = async (req, res) => {
  try {
    const order = await listOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'No orders found!' });
      return;
    }
    res.json(order);
  } catch (e) {
    console.error('getOrderById', e.message);
  }
};
const getFilteredOrders = async (req, res) => {
  try {
    const orders = await listFilteredOrders(req.params.id);
    if (orders.length < 1) {
      res.status(404).json({ message: 'Order not found!' });
      return;
    }
    res.json(orders);
  } catch (e) {
    console.error('getFilteredOrders', e.message);
  }
};
const getOrdersCounts = async (req, res) => {
  try {
    const orders = await listOrdersCounts();
    if (orders.length < 1) {
      res.status(404).json({ message: 'No orders found!' });
      return;
    }
    res.json(orders);
  } catch (e) {
    console.error('getOrdersCounts', e.message);
  }
};
const getMyOrders = async (req, res) => {
  try {
    const orders = await listMyOrders(req.params.id);
    if (!orders || orders.length < 1) {
      res.json({ message: 'No orders found!' });
      return;
    }

    res.json(orders);
  } catch (e) {
    console.error('getMyOrders', e.message);
  }
};
const getHotdogsAndToppings = async (req, res) => {
  try {
    const hotdogsAndToppings = await listOrderHotdogsAndToppings(req.params.id);
    if (!hotdogsAndToppings || hotdogsAndToppings.length < 1) {
      res.json({ message: 'No hotdogs And Toppings found!' });
      return;
    }

    res.json(hotdogsAndToppings);
  } catch (e) {
    console.error('getHotdogsAndToppings', e.message);
  }
};
const postOrders = async (req, res, next) => {
  const order_id = await addOrder(req.body);
  // order is undefined
  if (!order_id) {
    const error = new Error('Could not add order');
    error.status = 401;
    return next(error);
  }
  // db error in model
  if (order_id.error) {
    return next(new Error(order_id.error));
  }
  res.status(201).json({ message: 'Order added', order_id });
};

const postOrdersHotdogs = async (req, res, next) => {
  const orderHotdogs = await addOrderHotdogs(req.body);

  // orderHotdogs is undefined or null
  if (orderHotdogs === undefined || orderHotdogs === null) {
    const error = new Error('Could not add to orderHotdogs');
    error.status = 401;
    return next(error);
  }

  // db error in model
  if (orderHotdogs.error) {
    return next(new Error(orderHotdogs.error));
  }
  res.status(201).json({ message: 'orderHotdogs added', orderHotdogs });
};

const getOrdersHotdogs = async (req, res) => {
  try {
    const orderHotdogs = await listOrderHotdogs(req.params.id);
    if (orderHotdogs.length < 1) {
      res.json({ message: 'No order hotdogs found!' });
      return;
    }
    res.json(orderHotdogs);
  } catch (e) {
    console.error('getOrdersHotdogs', e.message);
  }
};
const putOrderTotalPrice = async (req, res) => {
  try {
    const data = [req.body.total_price, req.body.order_id];
    const result = await updateOrderTotalPrice(data);
    if (!result) {
      res.status(404);
      return;
    }
    res.json({
      message: 'Orders total price updated',
      result,
    });
  } catch (e) {
    console.error('putOrderTotalPrice', e.message);
  }
};
const getOrderTotalPrice = async (req, res) => {
  try {
    const hotdogs = await listHotdogPrices(req.params.id);
    // if (hotdogs.length < 1) {
    //   res.json({ message: 'No order hotdogs found!' });
    //   return;
    // }
    res.json(hotdogs);
  } catch (e) {
    console.error('getOrderTotalPrice', e.message);
  }
};

const putOrderStatus = async (req, res) => {
  try {
    const result = await updateOrderStatus(req.body);
    if (!result) {
      res.status(404);
      return;
    }
    res.json({
      message: 'Orders status updated',
    });
  } catch (error) {
    console.error('putOrderStatus', error.message);
  }
};

export {
  getOrders,
  postOrders,
  postOrdersHotdogs,
  getOrdersHotdogs,
  putOrderTotalPrice,
  putOrderStatus,
  getFilteredOrders,
  getOrdersCounts,
  getOrderById,
  getMyOrders,
  getHotdogsAndToppings,
  getOrderTotalPrice,
};
