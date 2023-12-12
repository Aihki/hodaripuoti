import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { login } from '../models/userModel.mjs';
import bcrypt from 'bcryptjs';

const postLogin = async (req, res, next) => {
  const user = await login(req.body.email);
  // user is undefined (username not found in db)
  if (!user) {
    const error = new Error('email/password invalid');
    error.status = 401;
    return next(error);
  }
  // db error in model
  if (user.error) {
    return next(new Error(result.error));
  }

  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.json({ message: 'logged in', token, user });
  } else {
    const error = new Error('email/password invalid');
    error.status = 401;
    return next(error);
  }
};

const getMe = (req, res) => {
  res.json(req.user);
};

export { postLogin, getMe };
