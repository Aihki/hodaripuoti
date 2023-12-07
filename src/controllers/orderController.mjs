import {
  addOrder,
  addOrderHotdogs,
  listAllOrders,
  listFilteredOrders,
  listOrderHotdogs,
  listOrdersCounts,
  updateOrderStatus,
  updateOrderTotalPrice,
} from "../models/orderModel.mjs";

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
      res.status(404).json({ message: "No orders found!" });
      return;
    }
    res.json(orders);
  } catch (e) {
    console.error("getOrders", e.message);
  }
};
const getFilteredOrders = async (req, res) => {
  try {
    const orders = await listFilteredOrders(req.params.id);
    if (orders.length < 1) {
      res.status(404).json({ message: "No orders found!" });
      return;
    }
    res.json(orders);
  } catch (e) {
    console.error("getFilteredOrders", e.message);
  }
};
const getOrdersCounts = async (req, res) => {
  try {
    const orders = await listOrdersCounts();
    if (orders.length < 1) {
      res.status(404).json({ message: "No orders found!" });
      return;
    }
    res.json(orders);
  } catch (e) {
    console.error("getOrdersCounts", e.message);
  }
};
const postOrders = async (req, res, next) => {
  const order_id = await addOrder(req.body);
  // order is undefined
  if (!order_id) {
    const error = new Error("Could not add order");
    error.status = 401;
    return next(error);
  }
  // db error in model
  if (order_id.error) {
    return next(new Error(order_id.error));
  }
  res.status(201).json({ message: "Order added", order_id });
};

const postOrdersHotdogs = async (req, res, next) => {
  const orderHotdogs = await addOrderHotdogs(req.body);

  // orderHotdogs is undefined or null
  if (orderHotdogs === undefined || orderHotdogs === null) {
    const error = new Error("Could not add to orderHotdogs");
    error.status = 401;
    return next(error);
  }

  // db error in model
  if (orderHotdogs.error) {
    return next(new Error(orderHotdogs.error));
  }

  console.log("postOrdersHotdogs", orderHotdogs);
  res.status(201).json({ message: "orderHotdogs added", orderHotdogs });
};

const getOrdersHotdogs = async (req, res) => {
  try {
    const orderHotdogs = await listOrderHotdogs(req.params.id);
    if (orderHotdogs.length < 1) {
      res.status(404).json({ message: "No order hotdogs found!" });
      return;
    }
    res.json(orderHotdogs);
  } catch (e) {
    console.error("getOrdersHotdogs", e.message);
  }
};
const putOrderTotalPrice = async (req, res) => {
  try {
    const result = await updateOrderStatus(req.body);
    if (!result) {
      res.status(404);
      return;
    }
    res.json({
      message: "Orders total price updated",
      result,
    });
  } catch (e) {
    console.error("putOrderTotalPrice", e.message);
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
      message: "Orders status updated",
    });
  } catch (error) {
    console.error("putOrderStatus", error.message);
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
};
