import { promisePool } from "../utils/database.mjs";

const getChefChoices = async () => {
  try {
    const [results] = await promisePool.query("SELECT * FROM Hotdogs");
    console.log(results);
    return results;
  } catch (error) {
    return { error: error.message };
  }
};

const newChefChoice = async (menuItem) => {
  const { hotdog_name, base_price, topping_ids } = menuItem;
  const insertHotdogSQL = `INSERT INTO Hotdogs (hotdog_name, base_price) VALUES (?, ?)`;
  const insertToppingsSQL = `INSERT INTO Hotdog_toppings (hotdog_id, topping_id) VALUES (?, ?)`;

  try {
    const hotdogParams = [hotdog_name, base_price];
    const [hotdogResult] = await promisePool.query(
      insertHotdogSQL,
      hotdogParams
    );

    const hotdogId = hotdogResult.insertId;
    for (const toppingId of topping_ids) {
      const toppingParams = [hotdogId, toppingId];
      await promisePool.query(insertToppingsSQL, toppingParams);
    }
    return { message: "Hotdog and toppings inserted successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

const updateChefChoice = async (id, update) => {
  const { hotdog_name, base_price } = update;

  const sql = `UPDATE Hotdogs SET hotdog_name = ?, base_price = ? WHERE hotdog_id = ?`;
  const params = [hotdog_name, base_price, id];
  try {
    const results = await promisePool.query(sql, params);
    return results[0].affectedRows > 0
      ? { message: "hotdog price updated" }
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

export { getChefChoices, updateChefChoice };
