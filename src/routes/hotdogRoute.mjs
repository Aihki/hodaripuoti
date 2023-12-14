import express from "express";
import { body } from "express-validator";
import {
  getCustomerHotdogs,
  getHotdogById,
  getHotdogToppings,
  getMenuHotdogs,
  postHotdogs,
  postHotdogsToppings,
} from "../controllers/hotdogController.mjs";
import { getOrdersHotdogs } from "../controllers/orderController.mjs";

const hotdogRouter = express.Router();

/**
 * @api {post} /hotdog Add hotdog
 * @apiVersion 1.0.0
 * @apiName PostHotdog
 * @apiGroup Hotdog
 * @apiPermission all
 *
 * @apiDescription Add a new hotdog
 *
 * @apiParam {String} hotdog_name Name of the hotdog.
 * @apiParam {String} base_price Base price of the hotdog.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "hotdog_name": "Custom",
 *      "base_price": 1.00
 *    }
 *
 * @apiSuccess {String} message Message text
 * @apiSuccess {Number} hotdog_id Hotdogs id.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
    "message": "Hotdog added",
    "hotdog_id": 163
    }
 */
hotdogRouter
  .route("/")
  .post(
    body("hotdog_name").trim().isAlphanumeric(),
    body("base_price").isNumeric(),
    postHotdogs
  );

/**
 * @api {get} /hotdog/:id Get hotdog with ID
 * @apiVersion 1.0.0
 * @apiName getHotdogById
 * @apiGroup Hotdog
 * @apiPermission all
 *
 * @apiDescription Get hotdog with id
 *
 * @apiSuccess {Number} hotdog_id Hotdogs ID
 * @apiSuccess {String} hotdog_name Hotdogs Name.
 * @apiSuccess {String} base_price Hotdogs base price.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
    {
        "hotdog_id": 2,
        "hotdog_name": "Gluteeniton vegedog",
        "base_price": "14.00"
    }
]
 *
 */

hotdogRouter.route("/:id").get(getHotdogById);
/**
 * @api {post} /hotdog/hotdogToppings Add hotdog toppings
 * @apiVersion 1.0.0
 * @apiName postHotdogsToppings
 * @apiGroup Hotdog
 * @apiPermission all
 *
 * @apiDescription Add a new hotdog toppings
 *
 * @apiParam {Number} hotdog_id Id of the hotdog.
 * @apiParam {Number} topping_ids Id's of the toppings.
 *
 * @apiParamExample {json} Request-Example:
 *    {
    "hotdog_id": 9,
    "topping_ids": [10, 20]
}
 *
 * @apiSuccess {String} message Message text
 * @apiSuccess {Object} hotdogToppings info.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
    "message": "HotdogToppings added",
    "hotdogToppings": {
        "insertId": 0
    }
}
 *
 */

hotdogRouter
  .route("/hotdogToppings")
  .post(
    body("hotdog_id").isNumeric(),
    body("topping_id").isNumeric(),
    postHotdogsToppings
  );
/**
 * @api {get} /hotdog/hotdogToppings/:id Get hotdog toppings
 * @apiVersion 1.0.0
 * @apiName getHotdogToppings
 * @apiGroup Hotdog
 * @apiPermission all
 *
 * @apiDescription Add a new hotdog toppings
 *
 * @apiSuccess {Number} hotdog_id Hotdog's id
 * @apiSuccess {String} hotdog_name Name of the hotdog
 * @apiSuccess {Number} amount Amount of hotdogs
 * @apiSuccess {String} toppings toppings string.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    [
        {
        "hotdog_id": 1,
        "hotdog_name": "Tulinen vegedog",
        "amount": 1,
        "toppings": "Tulinen kastike, Tulinen soijamakkara, Jalapenos, Avacados, Täysjyvä sämpylä"
        }
      ]
 *
 */
hotdogRouter.route("/hotdogToppings/:id").get(getHotdogToppings);

/**
 * @api {get} /hotdog/menu Get menu hotdogs
 * @apiVersion 1.0.0
 * @apiName getMenuHotdogs
 * @apiGroup Hotdog
 * @apiPermission all
 *
 * @apiDescription Get all menu hotdogs
 *
 * 
 * @apiSuccess {Number} hotdog_id Hotdog's id
 * @apiSuccess {String} hotdog_name Name of the hotdog
 * @apiSuccess {Number} amount Amount of hotdogs
 * @apiSuccess {String} toppings toppings string.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    [
        {
        "hotdog_id": 1,
        "hotdog_name": "Tulinen vegedog",
        "amount": 1,
        "toppings": "Tulinen kastike, Tulinen soijamakkara, Jalapenos, Avacados, Täysjyvä sämpylä"
        }
      ]
 *
 */
hotdogRouter.route("/menu").get(getMenuHotdogs);

/**
 * @api {get} /hotdog/customer Get customer's hotdogs
 * @apiVersion 1.0.0
 * @apiName getCustomerHotdogs
 * @apiGroup Hotdog
 * @apiPermission all
 *
 * @apiDescription Get all customer hotdogs
 *
 * @apiSuccess {Number} hotdog_id Hotdog's id
 * @apiSuccess {String} hotdog_name Name of the hotdog
 * @apiSuccess {Number} amount Amount of hotdogs
 * @apiSuccess {String} toppings toppings string.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    [
        {
        "hotdog_id": 1,
        "hotdog_name": "Tulinen vegedog",
        "amount": 1,
        "toppings": "Tulinen kastike, Tulinen soijamakkara, Jalapenos, Avacados, Täysjyvä sämpylä"
        }
      ]
 *
 */
hotdogRouter.route("/customer").get(getCustomerHotdogs);

export default hotdogRouter;
