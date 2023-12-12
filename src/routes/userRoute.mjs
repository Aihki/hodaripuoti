import express from 'express';
import {
  deleteUserById,
  getUserById,
  getUsers,
  postUser,
  putUserById,
  getUsersWithRole,
  putRole,
  getWorkers,
} from '../controllers/userController.mjs';
import { body } from 'express-validator';

const userRouter = express.Router();

/**
 * @api {get} / Get list of users
 * @apiVersion 1.0.0
 * @apiName getUsers
 * @apiGroup Users
 * @apiPermission all
 *
 * @apiDescription Get hotdog with id
 *
 * @apiSuccess {Number} user_id Users ID
 * @apiSuccess {String} username Users username.
 * @apiSuccess {String} email Users email (hashed)
 * @apiSuccess {Number} role Users role
 * @apiSuccess {Number} points Points of user
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
    {
        "user_id": 1,
        "username": "testiuser3",
        "email": "testi3@mail.com",
        "role": 0,
        "points": 0
    },
    {
        "user_id": 2,
        "username": "testiuser3",
        "email": "testi3@mail.com",
        "role": 0,
        "points": 0
    },
]
 *
 */
/**
 * @api {post} / Add User
 * @apiVersion 1.0.0
 * @apiName postUser
 * @apiGroup Users
 * @apiPermission all
 *
 * @apiDescription Add a new hotdog
 *
 * @apiParam {String} username Users username
 * @apiParam {String} email Users email.
 * @apiParam {String} password Users password.
 *
 * @apiParamExample {json} Request-Example:
 *    {
  "username": "testiuser3",
  "email": "testi3@mail.com",
  "password": "salasanani123"
}
 *
 * @apiSuccess {String} message Message text
 * @apiSuccess {String} token Users token
 * @apiSuccess {Object} user Users object containing user data
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
    "message": "logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2sd24xIjo1LCJ1c2VybmFtZSI6InZsdwqwXRpc28iLCJlbWFpbCI6InZlZXRpc29AbWFpbC5jb20iLCJyb2xlIjoyLCJwb2ludHMiOjAsImlhdCsdcwMjI4NjcxMn0.QgBcB8m3DcGE6lN3oV40yfMBt1SN3wu6sXIjtmLD8EM",
    "user": {
        "user_id": 5,
        "username": "veetiso",
        "email": "veetiso@mail.com",
        "role": 2,
        "points": 0
    }
}
 *
 */
userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({ min: 3, max: 40 }).isAlphanumeric(),
    body('password').trim().isLength({ min: 8 }),
    postUser
  );

/**
 * @api {get} /workers Get list of users with role 1 or 2
 * @apiVersion 1.0.0
 * @apiName getWorkers
 * @apiGroup Users
 * @apiPermission all
 *
 * @apiDescription Get list of users with role 1 or 2
 *
 * @apiSuccess {Number} user_id Users ID
 * @apiSuccess {String} username Users username.
 * @apiSuccess {String} email Users email (hashed)
 * @apiSuccess {Number} role Users role
 * @apiSuccess {Number} points Points of user
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
    {
        "user_id": 3,
        "username": "testiuser3",
        "email": "testi3@mail.com",
        "role": 1,
        "points": 0
    },
    {
        "user_id": 5,
        "username": "veetiso",
        "email": "veetiso@mail.com",
        "role": 2,
        "points": 0
    }
]
 *
 */
userRouter.route('/workers').get(getWorkers);

/**
 * @api {get} /:id Get user with user ID
 * @apiVersion 1.0.0
 * @apiName getWorkers
 * @apiGroup Users
 * @apiPermission all
 *
 * @apiDescription Get user with user ID
 *
 * @apiSuccess {Number} user_id Users ID
 * @apiSuccess {String} username Users username.
 * @apiSuccess {String} email Users email (hashed)
 * @apiSuccess {Number} role Users role
 * @apiSuccess {Number} points Points of user
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
    "user_id": 5,
    "username": "veetiso",
    "email": "veetiso@mail.com",
    "role": 2,
    "points": 0
}
 *
 */
/**
 * @api {put} /:id Update user data
 * @apiVersion 1.0.0
 * @apiName putUserById
 * @apiGroup Users
 * @apiPermission all
 *
 * @apiDescription Update user data
 *
 * @apiParam {String} username Users username
 * @apiParam {String} password Users password.
 *
 * @apiParamExample {json} Request-Example:
 *    {
  "username": "testiuser3",
  "password": "salasanani123"
}
 *
 * @apiSuccess {String} message Message text
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
    "message": "user updated"
}
 *
 */
userRouter.route('/:id').get(getUserById).put(putUserById);

/**
 * @api {get} /role/:id Get users with role
 * @apiVersion 1.0.0
 * @apiName getUsersWithRole
 * @apiGroup Users
 * @apiPermission all
 *
 * @apiDescription Get users with role
 *
 * @apiSuccess {Number} user_id Users ID
 * @apiSuccess {String} username Users username.
 * @apiSuccess {String} email Users email (hashed)
 * @apiSuccess {Number} role Users role
 * @apiSuccess {Number} points Points of user
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [{
        "user_id": 1,
        "username": "testiuser3",
        "email": "testi3@mail.com",
        "role": 0,
        "points": 0
    },
    {
        "user_id": 2,
        "username": "testiuser3",
        "email": "testi3@mail.com",
        "role": 0,
        "points": 0
    },]
 *
 */
userRouter.route('/role/:id').get(getUsersWithRole);

export default userRouter;
