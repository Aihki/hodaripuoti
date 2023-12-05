import { promisePool } from '../utils/database.mjs';

const listAllMenuHotdogs = async () => {
  try {
    const [rows] = await promisePool.execute(`
    SELECT * FROM Hotdogs
    WHERE hotdog_id >= 0 AND hotdog_id <= 8
    LIMIT 8;
     `);
    return rows;
  } catch (e) {
    console.error('listAllMenuHotdogs', e.message);
  }
};

const listAllCustomerHotdogs = async () => {
  try {
    const [rows] = await promisePool.execute(`
      SELECT * FROM Hotdogs
      WHERE hotdog_id > 8;
       `);
    return rows;
  } catch (e) {
    console.error('listAllCustomerHotdogs', e.message);
  }
};

const addHotDog = async (hotdog) => {
  try {
    const sql = `INSERT INTO Hotdogs (hotdog_name, base_price)
                VALUES (?, ?)`;
    const params = [hotdog.hotdog_name, hotdog.base_price];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};
const addHotDogToppings = async (hotdog_id, topping_ids) => {
  try {
    const values = topping_ids.map((topping_id) => [hotdog_id, topping_id]);
    console.log('values: hotdog_id', values[0], values[1]);
    const sql = `INSERT INTO Hotdog_toppings (hotdog_id, topping_id) VALUES ?`;
    const result = await promisePool.query(sql, [values]);
    return { insertId: result[0].insertId };
  } catch (e) {
    console.error('Error adding hotdogToppings:', e.message);
    return { error: e.message };
  }
};

const listHotdogToppings = async (hotdog_id) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT * FROM ((Hotdog_toppings
        INNER JOIN Toppings ON Hotdog_toppings.topping_id = Toppings.topping_id)
        INNER JOIN Hotdogs ON Hotdog_toppings.hotdog_id = Hotdogs.hotdog_id)
        WHERE Hotdog_toppings.hotdog_id = ?;`,
      [hotdog_id]
    );
    return rows;
  } catch (e) {
    console.error('listHotdogToppings', e.message);
    throw httpError('Database error', 500);
  }
};

export {
  listAllMenuHotdogs,
  listAllCustomerHotdogs,
  addHotDog,
  addHotDogToppings,
  listHotdogToppings,
};
