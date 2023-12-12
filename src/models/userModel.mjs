import { promisePool } from '../utils/database.mjs';

const login = async (email) => {
  try {
    const sql = `SELECT user_id, username, password, email, role, points
                 FROM Users WHERE email = ?`;
    const params = [email];
    const result = await promisePool.query(sql, params);
    const [rows] = result;

    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const listAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT user_id, username, email, role, points FROM Users`
    );
    return rows;
  } catch (e) {
    console.error('listAllUsers', e.message);
  }
};
const listAllWorkers = async () => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT user_id, username, email, role, points FROM Users WHERE role = 1 OR role = 2`
    );
    return rows;
  } catch (e) {
    console.error('listAllWorkers', e.message);
  }
};

const listAllUsersWithRole = async (role) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT user_id, username, email, role, points FROM Users WHERE role = ?`,
      [role]
    );
    return rows;
  } catch (e) {
    console.error('listAllUsers', e.message);
  }
};

const findUserById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, role, points FROM Users WHERE user_id = ?',
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const addUser = async (user) => {
  try {
    const sql = `INSERT INTO Users (username, email, password)
                VALUES (?, ?, ?)`;
    const params = [user.username, user.email, user.password];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const checkIfEmailExists = async (emailToCheck) => {
  try {
    const sql = 'SELECT COUNT(*) as count FROM Users WHERE email = ?';
    const params = [emailToCheck];
    const result = await promisePool.query(sql, params);

    // Check if the count is greater than 0, indicating that the email exists
    return result[0][0].count > 0;
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const updateUser = async (user) => {
  try {
    const [rows] = await promisePool.execute(
      `UPDATE Users set username = ?, password = ? WHERE user_id = ?;`,
      user
    );
    return rows;
  } catch (e) {
    console.error('updateUser', e.message);
  }
};

const deleteUser = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      `DELETE FROM Users WHERE user_id = ?;`,
      [id]
    );
    return rows;
  } catch (e) {
    console.error('deleteUser', e.message);
  }
};
const updateRole = async (user) => {
  try {
    const sql = `UPDATE Users set role = ? WHERE user_id = ?;`;
    const params = [user.role, user.user_id];
    const result = await promisePool.query(sql, params);
    const [rows] = result;

    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};
export {
  deleteUser,
  updateUser,
  addUser,
  findUserById,
  listAllUsers,
  login,
  listAllUsersWithRole,
  checkIfEmailExists,
  updateRole,
  listAllWorkers,
};
