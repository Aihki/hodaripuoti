import {
  addUser,
  checkIfEmailExists,
  deleteUser,
  findUserById,
  listAllUsers,
  listAllUsersWithRole,
  listAllWorkers,
  updateRole,
  updateUser,
} from '../models/userModel.mjs';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

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
      res.status(404).json({ message: 'no users found' });
      return;
    }
    res.json(users);
  } catch (e) {
    console.error('getUsers', e.message);
    next();
  }
};
const getWorkers = async (req, res, next) => {
  try {
    const users = await listAllWorkers();
    if (users.length < 1) {
      res.status(404).json({ message: 'no users found' });
      return;
    }
    res.json(users);
  } catch (e) {
    console.error('getWorkers', e.message);
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
  const newUser = req.body;
  const salt = await bcrypt.genSalt(10);
  // replace plain text password with hash
  newUser.password = await bcrypt.hash(newUser.password, salt);
  // console.log('postUser', newUser);
  const newUserId = await addUser(newUser);
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
    const salt = await bcrypt.genSalt(10);
    // replace plain text password with hash
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const data = [req.body.username, hashedPassword, req.params.id];
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
const putRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // details about errors:
    console.log(errors.array());
    return res.status(400).json({ message: 'invalid input fields' });
  }
  const newUser = await updateRole(req.body);
  console.log('newUser', newUser);
  res.status(201).json({ message: 'user role updated' });
};
export {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  deleteUserById,
  getUsersWithRole,
  putRole,
  getWorkers,
};
