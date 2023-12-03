import express from 'express';
import { body } from 'express-validator';

const orderRouter = express.Router();

orderRouter
  .route('/')
  .get(getOrders)
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({ min: 3, max: 40 }).isAlphanumeric(),
    body('password').trim().isLength({ min: 8 }),
    postUser
  );

orderRouter
  .route('/:id')
  .get(getUserById)
  .put(putUserById)
  .delete(deleteUserById);
orderRouter.route('/role/:id').get(getUsersWithRole);

orderRouter
  .route('/updateRole')
  .put(
    body('user_id').trim(),
    body('role').trim().isLength({ min: 0, max: 2 }),
    putRole
  );

export default userRouter;
