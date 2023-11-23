import { promisePool } from "../utils/database.mjs";

const getProducts = async () => {
  try {
    const [results] = await promisePool.query("SELECT * FROM Toppings");
    console.log(results);
    res.status(200);
    return results;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const newIngrident = async (ingredients) => {
  const { topping_name, topping_type, price } = ingredients;
  const sql = `INSERT INTO hod_toppings (topping_name, topping_type, price) VALUES ( ?, ?, ?)`;
  const params = [topping_name, topping_type, price];
  try {
    const [results] = await promisePool.query(sql, params);
    return results;
  } catch (error) {
    return { error: error.message };
  }
};

export { getProducts, newIngrident };
