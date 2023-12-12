import express from 'express';
import { getMe, postLogin } from '../controllers/authController.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';
const authRouter = express.Router();

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError email or password invalid.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": {
 *         "message": "username/password invalid",
 *         "status": 401
 *       }
 *     }
 */

/**
 * @api {post} /login Login
 * @apiVersion 1.0.0
 * @apiName PostLogin
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiDescription Sign in and get an authentication token for the user.
 *
 * @apiParam {String} email Email of the user.
 * @apiParam {String} password Password of the user.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "email": "johnd",
 *      "password": "examplepass"
 *    }
 *
 * @apiSuccess {String} token Token for the user authentication.
 * @apiSuccess {Object} user User info.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
        "message": "logged in",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6InZlZXRpc28iLCJlbWFpbCI6InZlZXRpc29AbWFpbC5jb20iLCJyb2xlIjoyLCJwb2ludHMiOjAsImlhdCI6MTcwMjI4NjcxMn0.QgBcB8m3DcGE6lN3oV40yfMBt1SN3wu6sXIjtmLD8EM",
        "user": {
            "user_id": 5,
            "username": "veetiso",
            "email": "veetiso@mail.com",
            "role": 2,
            "points": 0
        }
    }
 *
 * @apiUse UnauthorizedError
 */
authRouter.route('/login').post(postLogin);

/**
 * @api {get} /auth/me Request information about current user
 * @apiVersion 1.0.0
 * @apiName GetMe
 * @apiGroup Authentication
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object} user User info.
 * @apiSuccess {Number} user.user_id Id of the User.
 * @apiSuccess {String} user.username Username of the User.
 * @apiSuccess {String} user.email email of the User.
 * @apiSuccess {Number} user.user_level_id User level id of the User.
 * @apiSuccess {Number} user.iat Token creation timestamp.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
          "user_id": 8,
          "username": "veetiso",
          "email": "veetiso@mail.com",
          "role": 0,
          "points": 0,
          "iat": 1701192188
        }
 *
 * @apiError InvalidToken Authentication token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "invalid token"
 *     }
 */
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
