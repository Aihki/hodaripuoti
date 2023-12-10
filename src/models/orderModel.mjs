import { promisePool } from '../utils/database.mjs';

const listAllOrders = async () => {
  try {
    const [rows] = await promisePool.execute(`SELECT * FROM Orders`);
    return rows;
  } catch (e) {
    console.error('listAllOrders', e.message);
  }
};
const listOrderById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT * FROM Orders WHERE order_id = ?`,
      [id]
    );
    return rows;
  } catch (e) {
    console.error('listOrderById', e.message);
  }
};

const listMyOrders = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT * FROM Orders WHERE user_id = ?`,
      [id]
    );
    return rows;
  } catch (e) {
    console.error('listMyOrders', e.message);
  }
};
const listHotdogPrices = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT
      O.order_id,
      HD.hotdog_name,
      HD.hotdog_id,
      HD.base_price AS hotdog_base_price,
      COALESCE(SUM(T.topping_price), 0) AS total_topping_price,
      OH.amount AS hotdog_amount,
      (HD.base_price + COALESCE(SUM(T.topping_price), 0)) * OH.amount AS total_price
    FROM
      Orders O
    JOIN
      Orders_hotdogs OH ON O.order_id = OH.order_id
    JOIN
      Hotdogs HD ON OH.hotdog_id = HD.hotdog_id
    LEFT JOIN
      Hotdog_toppings HT ON OH.hotdog_id = HT.hotdog_id
    LEFT JOIN
      Toppings T ON HT.topping_id = T.topping_id
    WHERE
      O.order_id = ?
    GROUP BY
      O.order_id, HD.hotdog_id, HD.hotdog_name, HD.base_price, OH.amount;
    `,
      [id]
    );
    return rows;
  } catch (e) {
    console.error('listHotdogPrices', e.message);
  }
};
const listFilteredOrders = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT * FROM Orders WHERE status = ?`,
      [id]
    );
    return rows;
  } catch (e) {
    console.error('listFilteredOrders', e.message);
  }
};
const listOrdersCounts = async () => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT 
      COUNT(*) AS totalOrders,
      SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS recievedCount,
      SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS inProgressCount,
      SUM(CASE WHEN status = 2 THEN 1 ELSE 0 END) AS completedCount,
      SUM(CASE WHEN status = 3 THEN 1 ELSE 0 END) AS pickedUpCount
      FROM Orders;`
    );
    return rows;
  } catch (e) {
    console.error('listOrdersCounts', e.message);
  }
};
const listOrderHotdogsAndToppings = async (order_id) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT H.hotdog_id, H.hotdog_name, OH.amount, GROUP_CONCAT(T.topping_name SEPARATOR ', ') AS toppings
      FROM Orders AS O
      JOIN Orders_hotdogs AS OH ON O.order_id = OH.order_id
      JOIN Hotdog_toppings AS HT ON OH.hotdog_id = HT.hotdog_id
      JOIN Toppings AS T ON HT.topping_id = T.topping_id
      JOIN Hotdogs AS H ON OH.hotdog_id = H.hotdog_id
      WHERE O.order_id = ?
      GROUP BY H.hotdog_id;`,
      [order_id]
    );
    return rows;
  } catch (e) {
    console.error('listOrderHotdogsAndToppings', e.message);
  }
};
const addOrder = async (order) => {
  try {
    const sql = `INSERT INTO Orders (total_price, user_id)
                VALUES (?, ?)`;
    const params = [order.total_price, order.user_id];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};
const addOrderHotdogs = async (data) => {
  try {
    const sql = `INSERT INTO Orders_hotdogs (order_id, hotdog_id, amount)
                  VALUES (?, ?, ?)`;
    const params = [data.order_id, data.hotdog_id, data.amount];
    const result = await promisePool.query(sql, params);
    return { insertId: result[0].insertId };
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const listOrderHotdogs = async (order_id) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT * FROM ((Orders_hotdogs
        INNER JOIN Hotdogs ON Orders_hotdogs.hotdog_id = Hotdogs.hotdog_id)
        INNER JOIN Orders ON Orders_hotdogs.order_id = Orders.order_id)
        WHERE Orders_hotdogs.order_id = ?;`,
      [order_id]
    );
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const updateOrderTotalPrice = async (data) => {
  try {
    const [rows] = await promisePool.execute(
      `UPDATE Orders set total_price = ? WHERE order_id = ?;`,
      data
    );
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const updateOrderStatus = async (body) => {
  try {
    const [rows] = await promisePool.execute(
      `UPDATE Orders set status = ? WHERE order_id = ?;`,
      [body.status, body.order_id]
    );
    return rows;
  } catch (e) {
    console.error('updateOrderStatus', e.message);
    throw httpError('Database error', 500);
  }
};

export {
  listAllOrders,
  addOrder,
  addOrderHotdogs,
  listOrderHotdogs,
  updateOrderTotalPrice,
  updateOrderStatus,
  listFilteredOrders,
  listOrdersCounts,
  listOrderById,
  listMyOrders,
  listOrderHotdogsAndToppings,
  listHotdogPrices,
};
