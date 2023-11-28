import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { login } from '../models/userModel.mjs';

const postLogin = async (req, res) => {
  // TODO: use model to query sql for user info (username/pw)
  const user = await login(req.body);
  if (user && user.error) {
    return next(new Error(user.error));
  }
  console.log('postLogin', user);
  try {
    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.json({ message: 'logged in', token, user });
  } catch (error) {
    res.status(401).json({ message: 'invalid username/password' });
  }
};

const getMe = (req, res) => {
  console.log('getMe user', req.user);
  res.json(req.user);
};

export { postLogin, getMe };
