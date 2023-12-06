import { promisePool } from '../utils/database.mjs';

const listAllOrders = async () => {
  try {
    const [rows] = await promisePool.execute(`SELECT * FROM Orders`);
    return rows;
  } catch (e) {
    console.error('listAllOrders', e.message);
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
      SUM(CASE WHEN status = 2 THEN 1 ELSE 0 END) AS completedCount
      FROM Orders;`
    );
    return rows;
  } catch (e) {
    console.error('listOrdersCounts', e.message);
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

// NOT IN USE
const updateOrderTotalPrice = async (order_id) => {
  try {
    const [rows] = await promisePool.execute(
      `UPDATE Orders set total_price WHERE user_id = ?;`,
      [order_id]
    );
    return rows;
  } catch (e) {
    console.error('listOrderHotdogs', e.message);
    throw httpError('Database error', 500);
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
};
