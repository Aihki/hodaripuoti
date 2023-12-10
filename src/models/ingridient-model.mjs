import { promisePool } from "../utils/database.mjs";

const getProducts = async () => {
  try {
    const [results] = await promisePool.query("SELECT * FROM Toppings");
    console.log(results);
    return results;
  } catch (error) {
    return { error: error.message };
  }
};

const newIngrident = async (ingredients) => {
  const { topping_name, topping_type, price } = ingredients;
  const sql = `INSERT INTO Toppings (topping_name, topping_type, price) VALUES ( ?, ?, ?)`;
  const params = [topping_name, topping_type, price];
  try {
    const [results] = await promisePool.query(sql, params);
    return results;
  } catch (error) {
    return { error: error.message };
  }
};

const updateIngrident = async (id, update) => {
  const { topping_name, topping_type, price } = update;
  const sql = `UPDATE Toppings SET topping_name = ?, topping_type = ?, price = ? WHERE id = ?`;
  const params = [topping_name, topping_type, price, id];
  try {
    const results = await promisePool.query(sql, params);
    return results[0].affectedRows > 0
      ? { success: "Ingridient price updated" }
      : { error: "Not found" };
  } catch (error) {
    return { error: error.message };
  }
};

const deleteIngrident = async (id) => {
  const sql = `DELETE FROM Toppings WHERE id = ?`;
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

export { getProducts, updateIngrident };
