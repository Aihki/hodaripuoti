import { promisePool } from "../utils/database.mjs";

const getChefChoices = async () => {
  try {
    const [results] = await promisePool.query("SELECT * FROM hod_custom");
    console.log(results);
    return results;
  } catch (error) {
    return { error: error.message };
  }
};

const newChefChoice = async (menuItem) => {
  const { hotdog_name, toppings, base_price } = menuItem;
  const sql = `INSERT INTO Custom ( hotdog_name , , base_price) VALUES ( ?, ?, ?)`;
  const params = [hotdog_name, toppings, base_price];
  try {
    const [results] = await promisePool.query(sql, params);
    return results;
  } catch (error) {
    return { error: error.message };
  }
};

const updateChefChoice = async (menuItem) => {
  const { hotdog_name, toppings, base_price } = menuItem;
  const sql = `UPDATE Custom SET hotdog_name = ?, toppings = ?, base_price = ? WHERE id = ?`;
  const params = [hotdog_name, toppings, base_price];
  try {
    const results = await promisePool.query(sql, params);
    return results[0].affectedRows > 0
      ? { success: "Updated" }
      : { error: "Not found" };
  } catch (error) {
    return { error: error.message };
  }
};

const deleteChefChoice = async (id) => {
  const sql = `DELETE FROM Custom WHERE id = ?`;
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

export { getChefChoices };
