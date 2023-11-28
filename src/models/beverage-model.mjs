import { promisePool } from "../utils/database.mjs";

const getBeverage = async () => {
  try {
    const [results] = await promisePool.query("SELECT * FROM Beverage");
    console.log(results);
    return results;
  } catch (error) {
    return { error: error.message };
  }
};

const newBeverage = async (drink) => {
  const { topping_name, topping_type, price } = drink;
  const sql = `INSERT INTO Beverage (topping_name, topping_type, price) VALUES ( ?, ?, ?)`;
  const params = [topping_name, topping_type, price];
  try {
    const [results] = await promisePool.query(sql, params);
    return results;
  } catch (error) {
    return { error: error.message };
  }
};

const updateBeverage = async (drink) => {
  const { topping_name, topping_type, price } = drink;
  const sql = `UPDATE Beverage SET topping_name = ?, topping_type = ?, price = ? WHERE id = ?`;
  const params = [topping_name, topping_type, price];
  try {
    const results = await promisePool.query(sql, params);
    return results[0].affectedRows > 0
      ? { success: "Updated" }
      : { error: "Not found" };
  } catch (error) {
    return { error: error.message };
  }
};

const deleteBeverage = async (id) => {
  const sql = `DELETE FROM Beverage WHERE id = ?`;
  const params = [id];
  try {
    const results = await promisePool.query(sql, params);
    return results[0].affectedRows > 0
      ? { success: "Deleted" }
      : { error: "Not found" };
  } catch (error) {
    return { error: error.message };
  }
};

export { getBeverage };
