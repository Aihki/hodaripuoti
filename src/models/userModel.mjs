import { promisePool } from '../utils/database.mjs';
const testUsersObj = [
  {
    user_id: 1,
    username: 'Testi',
    email: 'Testi@mail.com',
    password: 'teesti',
    points: 10,
    role: 1,
  },
  {
    user_id: 2,
    username: 'Testi2',
    email: 'Testi2@mail.com',
    password: 'teesti2',
    points: 20,
    role: 2,
  },
  {
    user_id: 3,
    username: 'Testi3',
    email: 'Testi3@mail.com',
    password: 'teesti3',
    points: 30,
    role: 2,
  },
  {
    user_id: 4,
    username: 'Testi4',
    email: 'Testi4@mail.com',
    password: 'teesti4',
    points: 40,
    role: 0,
  },
  {
    user_id: 5,
    username: 'Testi5',
    email: 'Testi5@mail.com',
    password: 'teesti5',
    points: 50,
    role: 0,
  },

  {
    user_id: 6,
    username: 'Testi6',
    email: 'Testi6@mail.com',
    password: 'teesti6',
    points: 60,
    role: 1,
  },
];

const login = async (email) => {
  try {
    const sql = `SELECT user_id, username, password, email, role, points
                 FROM hod_users WHERE email = ?`;
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
    const [rows] = await promisePool.execute(`SELECT * FROM hod_users`);
    return rows;
  } catch (e) {
    console.error('listAllUsers', e.message);
  }
};

const listAllUsersWithRole = async (role) => {
  const sortedUsers = testUsersObj.filter((user) => {
    return user.role === role;
  });
  return sortedUsers;
  try {
    /*const [rows] = await promisePool.execute(`SELECT * FROM Users WHERE role = ?`,
      [role]
    );
    return rows;*/
  } catch (e) {
    console.error('listAllUsers', e.message);
  }
};

const findUserById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM Users WHERE user_id = ?',
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
    const sql = `INSERT INTO hod_users (username, email, password)
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
    const sql = 'SELECT COUNT(*) as count FROM hod_users WHERE email = ?';
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
      `UPDATE bet_users set username = ?, email = ?, password = ?, user_level_id = ? WHERE user_id = ?;`,
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
      `DELETE FROM bet_users WHERE user_id = ?;`,
      [id]
    );
    return rows;
  } catch (e) {
    console.error('deleteUser', e.message);
  }
};
const updateRole = async (user) => {
  try {
    const sql = `UPDATE bet_users set role = ? WHERE user_id = ?;`;
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
};
