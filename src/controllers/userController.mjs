import {
  addUser,
  checkIfEmailExists,
  deleteUser,
  findUserById,
  listAllUsers,
  listAllUsersWithRole,
  updateUser,
} from '../models/userModel.mjs';
import { validationResult } from 'express-validator';

/**
 * Get all users
 *
 * @param {object} req
 * @param {object} res
 */
const getUsers = async (req, res, next) => {
  try {
    const users = await listAllUsers();
    if (users.length < 1) {
      res.status(404);
      return;
    }
    res.json(users);
  } catch (e) {
    console.error('getUsers', e.message);
    next();
  }
};
/**
 * Get one user with id
 *
 * @param {object} req
 * @param {object} res
 */
const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};
const getUsersWithRole = async (req, res) => {
  const users = await listAllUsersWithRole(parseInt(req.params.id));
  if (users.length < 1) {
    res.status(404);
    res.json({ message: 'no users found' });
    return;
  }
  res.json(users);
};
/**
 * Create one User
 *
 * @param {object} req
 * @param {object} res
 */
const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // details about errors:
    console.log(errors.array());
    return res.status(400).json({ message: 'invalid input fields' });
  }

  // Check if email is already in use
  const { email } = req.body;
  const emailExists = await checkIfEmailExists(email);
  if (emailExists) {
    return res.status(400).json({ message: 'Email is already in use' });
  }

  // If email does not exist add a new user
  const newUserId = await addUser(req.body);
  res.status(201).json({ message: 'user added', user_id: newUserId });
};
/**
 * Update one user with id
 *
 * @param {object} req
 * @param {object} res
 */
const putUserById = async (req, res) => {
  try {
    const data = [
      req.body.username,
      req.body.password,
      req.body.email,
      parseInt(req.body.user_level_id),
      req.params.id,
    ];
    const result = await updateUser(data);
    if (!result) {
      res.status(404);
      return;
    }
    res.json({
      message: 'user updated',
    });
  } catch (e) {
    console.error('putUserById', e.message);
  }
};
/**
 * Delete one user with id
 *
 * @param {object} req
 * @param {object} res
 */
const deleteUserById = async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    if (!result) {
      res.status(404);
      return;
    }
    res.status(200);
    res.json({
      message: 'user deleted',
    });
  } catch (e) {
    console.error('delete', e.message);
  }
};
export {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  deleteUserById,
  getUsersWithRole,
};
