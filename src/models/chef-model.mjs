import { promisePool } from "../utils/database.mjs";

const getChefChoices = async () => {
  try {
    const [results] = await promisePool.query("SELECT * FROM hod_custom");
    console.log(results);
    return results;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const newChefChoice = async (ingredients) => {
  const { topping_name, topping_type, price } = ingredients;
  const sql = `INSERT INTO hod_beverage (topping_name, topping_type, price) VALUES ( ?, ?, ?)`;
  const params = [topping_name, topping_type, price];
  try {
    const [results] = await promisePool.query(sql, params);
    return results;
  } catch (error) {
    return { error: error.message };
  }
};

export { getChefChoices };