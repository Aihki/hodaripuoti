import { promisePool } from '../utils/database.mjs';

const listAllOrders = async () => {
  try {
    const [rows] = await promisePool.execute(`SELECT * FROM Orders`);
    return rows;
  } catch (e) {
    console.error('listAllOrders', e.message);
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
    console.error('listOrderHotdogs', e.message);
    throw httpError('Database error', 500);
  }
};

const updateOrderTotalPrice = async (order_id) => {
  try {
    const [rows] = await promisePool.execute(
      `UPDATE Orders
      SET total_price = (
          SELECT SUM(Hotdogs.base_price + COALESCE(topping_total, 0) * Orders_hotdogs.amount)
          FROM Orders_hotdogs
          JOIN Hotdogs ON Orders_hotdogs.hotdog_id = Hotdogs.hotdog_id
          LEFT JOIN (
              SELECT Hotdog_toppings.hotdog_id, SUM(Toppings.topping_price) as topping_total
              FROM Hotdog_toppings
              LEFT JOIN Toppings ON Hotdog_toppings.topping_id = Toppings.topping_id
              GROUP BY Hotdog_toppings.hotdog_id
          ) AS ToppingTotals ON Orders_hotdogs.hotdog_id = ToppingTotals.hotdog_id
          WHERE Orders_hotdogs.order_id = Orders.order_id
          GROUP BY Orders_hotdogs.order_id
      )
      WHERE order_id = ?;
       `,
      [order_id]
    );
    return rows;
  } catch (e) {
    console.error('listOrderHotdogs', e.message);
    throw httpError('Database error', 500);
  }
};

export {
  listAllOrders,
  addOrder,
  addOrderHotdogs,
  listOrderHotdogs,
  updateOrderTotalPrice,
};
