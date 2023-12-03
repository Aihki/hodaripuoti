import express from 'express';
import {
  deleteUserById,
  getUserById,
  getUsers,
  postUser,
  putUserById,
  getUsersWithRole,
  putRole,
} from '../controllers/userController.mjs';
import { body } from 'express-validator';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({ min: 3, max: 40 }).isAlphanumeric(),
    body('password').trim().isLength({ min: 8 }),
    postUser
  );

userRouter
  .route('/:id')
  .get(getUserById)
  .put(putUserById)
  .delete(deleteUserById);
userRouter.route('/role/:id').get(getUsersWithRole);

userRouter
  .route('/updateRole')
  .put(
    body('user_id').trim(),
    body('role').trim().isLength({ min: 0, max: 2 }),
    putRole
  );

export default userRouter;
