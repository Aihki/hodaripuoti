import express from 'express';
import { body } from 'express-validator';
import {
  getFilteredOrders,
  getHotdogsAndToppings,
  getMyOrders,
  getOrderById,
  getOrders,
  getOrdersCounts,
  getOrdersHotdogs,
  getOrderTotalPrice,
  postOrders,
  postOrdersHotdogs,
  putOrderStatus,
  putOrderTotalPrice,
} from '../controllers/orderController.mjs';

const orderRouter = express.Router();

/**
 * @api {get} / Get all orders
 * @apiVersion 1.0.0
 * @apiName getOrders
 * @apiGroup Orders
 * @apiPermission all
 *
 * @apiDescription Get all orders
 *
 * @apiSuccess {Number} order_id Orders id
 * @apiSuccess {String} order_date Time when order was done
 * @apiSuccess {String} total_price Total price of the order.
 * @apiSuccess {Number} status Status of the order
 * @apiSuccess {String} user_id Owners id.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
        {
        "order_id": 2,
        "order_date": "2023-12-03T18:19:07.000Z",
        "status": 3,
        "total_price": "15.50",
        "user_id": 1
    },
    {
        "order_id": 3,
        "order_date": "2023-12-03T18:19:24.000Z",
        "status": 3,
        "total_price": "10.00",
        "user_id": 1
    },
      ]
 *
 * @apiUse UnauthorizedError
 */
/**
 * @api {post} / Add order
 * @apiVersion 1.0.0
 * @apiName postOrders
 * @apiGroup Orders
 * @apiPermission all
 *
 * @apiDescription Add a new order
 *
 * @apiParam {Number} total_price Price of the order.
 * @apiParam {Number} user_id Id's of the user.
 *
 * @apiParamExample {json} Request-Example:
 *    {
    "total_price": 0.00,
    "user_id": 1
}
 *
 * @apiSuccess {String} message Message text
 * @apiSuccess {Number} order_id Orders new id.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
    "message": "Order added",
    "order_id": 102
}
 *
 * @apiUse UnauthorizedError
 */
orderRouter
  .route('/')
  .get(getOrders)
  .post(
    body('user_id').isNumeric(),
    body('total_price').isNumeric(),
    postOrders
  );
/**
 * @api {get} /ordersCounts Get all orders status counts
 * @apiVersion 1.0.0
 * @apiName getOrdersCounts
 * @apiGroup Orders
 * @apiPermission all
 *
 * @apiDescription Get all orders status counts
 *
 * @apiSuccess {Number} totalOrders Count of all orders
 * @apiSuccess {String} recievedCount Count of recieved status orders
 * @apiSuccess {String} inProgressCount Count of in progress status orders
 * @apiSuccess {String} completedCount Count of completed status orders
 * @apiSuccess {String} pickedUpCount Count of picked up status orders
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
    {
        "totalOrders": 100,
        "recievedCount": "73",
        "inProgressCount": "7",
        "completedCount": "15",
        "pickedUpCount": "5"
    }
]
 *
 * @apiUse UnauthorizedError
 */
orderRouter.route('/ordersCounts').get(getOrdersCounts);

/**
 * @api {get} /getMyOrders/:id Get all users orders
 * @apiVersion 1.0.0
 * @apiName getMyOrders
 * @apiGroup Orders
 * @apiPermission all
 *
 * @apiDescription Get all users orders
 *
 * @apiSuccess {Number} order_id Orders id
 * @apiSuccess {String} order_date Time when order was created
 * @apiSuccess {String} status Status of the order
 * @apiSuccess {String} total_price Price of the order
 * @apiSuccess {String} user_id Users id
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
    {
        "order_id": 8,
        "order_date": "2023-12-04T14:29:10.000Z",
        "status": 3,
        "total_price": "25.00",
        "user_id": 5
    },
    {
        "order_id": 9,
        "order_date": "2023-12-05T15:31:27.000Z",
        "status": 1,
        "total_price": "0.00",
        "user_id": 5
    },
]
 *
 * @apiUse UnauthorizedError
 */
orderRouter.route('/getMyOrders/:id').get(getMyOrders);

/**
 * @api {get} /:id Get order with id
 * @apiVersion 1.0.0
 * @apiName getOrderById
 * @apiGroup Orders
 * @apiPermission all
 *
 * @apiDescription Get order with id
 *
 * @apiSuccess {Number} order_id Orders id
 * @apiSuccess {String} order_date Time when order was created
 * @apiSuccess {String} status Status of the order
 * @apiSuccess {String} total_price Price of the order
 * @apiSuccess {String} user_id Users id
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
    {
        "order_id": 100,
        "order_date": "2023-12-10T18:19:25.000Z",
        "status": 0,
        "total_price": "3.50",
        "user_id": 13
    }
]
 *
 * @apiUse UnauthorizedError
 */
orderRouter.route('/:id').get(getOrderById);

/**
 * @api {put} /changeOrderStatus Update order status
 * @apiVersion 1.0.0
 * @apiName putOrderStatus
 * @apiGroup Orders
 * @apiPermission all
 *
 * @apiDescription Update order status
 * 
 * @apiParam {Number} status New status of the order (0-3).
 * @apiParam {Number} order_id Id's of the order.
 *
 * @apiParamExample {json} Request-Example:
 *    {
    "status": 3,
    "order_id": 10
}
 *
 * @apiSuccess {String} message Message text
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
    "message": "Orders status updated"
}
 *
 * @apiUse UnauthorizedError
 */
orderRouter.route('/changeOrderStatus').put(putOrderStatus);

/**
 * @api {get} /getFilteredOrders/:id Get orders with status as id
 * @apiVersion 1.0.0
 * @apiName getFilteredOrders
 * @apiGroup Orders
 * @apiPermission all
 *
 * @apiDescription Get orders with status as id
 *
 * @apiSuccess {Number} order_id Orders id
 * @apiSuccess {String} order_date Time when order was created
 * @apiSuccess {String} status Status of the order
 * @apiSuccess {String} total_price Price of the order
 * @apiSuccess {String} user_id Users id
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
    {
        "order_id": 4,
        "order_date": "2023-12-03T18:19:49.000Z",
        "status": 2,
        "total_price": "10.00",
        "user_id": 1
    },
    {
        "order_id": 6,
        "order_date": "2023-12-03T22:50:20.000Z",
        "status": 2,
        "total_price": "0.00",
        "user_id": 1
    },
]
 *
 * @apiUse UnauthorizedError
 */
orderRouter.route('/getFilteredOrders/:id').get(getFilteredOrders);

/**
 * @api {post} /orderHotdogs Post new order hotdogs link
 * @apiVersion 1.0.0
 * @apiName postOrdersHotdogs
 * @apiGroup Orders
 * @apiPermission all
 *
 * @apiDescription Post new order hotdogs link
 * 
 * @apiParam {Number} order_id Id of order
 * @apiParam {Number} hotdog_id Id of hotdog
 * @apiParam {Number} amount Amount of hotdogs
 *
 * @apiParamExample {json} Request-Example:
 *   {
    "order_id": 2,
    "hotdog_id": 2,
    "amount": 2
}
 *
 * @apiSuccess {String} message Message text
 * @apiSuccess {Object} orderHotdogs info
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
    "message": "orderHotdogs added",
    "orderHotdogs": {
        "insertId": 0
    }
}
 *
 * @apiUse UnauthorizedError
 */
orderRouter
  .route('/orderHotdogs')
  .post(
    body('order_id').isNumeric(),
    body('hotdog_id').isNumeric(),
    body('amount').isNumeric(),
    postOrdersHotdogs
  );

/**
 * @api {get} /orderHotdogs/:id Get all hotdogs of order and order data
 * @apiVersion 1.0.0
 * @apiName getOrdersHotdogs
 * @apiGroup Orders
 * @apiPermission all
 *
 * @apiDescription Get all hotdogs of order and order data
 *
 * @apiSuccess {Number} order_id Orders id
 * @apiSuccess {Number} hotdog_id Hotdogs id
 * @apiSuccess {Number} amount Hotdogs amount
 * @apiSuccess {String} hotdog_name Hotdogs name
 * @apiSuccess {String} base_price Hotdogs base price
 * @apiSuccess {String} order_date Time when order was created
 * @apiSuccess {String} status Status of the order
 * @apiSuccess {String} total_price Price of the order
 * @apiSuccess {String} user_id Users id
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
    {
        "order_id": 2,
        "hotdog_id": 1,
        "amount": 1,
        "hotdog_name": "Tulinen vegedog",
        "base_price": "10.00",
        "order_date": "2023-12-03T18:19:07.000Z",
        "status": 3,
        "total_price": "15.50",
        "user_id": 1
    },
    {
        "order_id": 2,
        "hotdog_id": 2,
        "amount": 2,
        "hotdog_name": "Gluteeniton vegedog",
        "base_price": "14.00",
        "order_date": "2023-12-03T18:19:07.000Z",
        "status": 3,
        "total_price": "15.50",
        "user_id": 1
    }
]
 *
 */
orderRouter.route('/orderHotdogs/:id').get(getOrdersHotdogs);

/**
 * @api {get} /hotdogsAndToppings/:id Get all toppings hotdogs
 * @apiVersion 1.0.0
 * @apiName getHotdogsAndToppings
 * @apiGroup Orders
 * @apiPermission all
 *
 * @apiDescription Get all toppings hotdogs
 *
 * @apiSuccess {Number} hotdog_id Hotdogs id
 * @apiSuccess {String} hotdog_name Hotdogs name
 * @apiSuccess {Number} amount Hotdogs amount
 * @apiSuccess {String} toppings Toppings string
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
    {
        "hotdog_id": 1,
        "hotdog_name": "Tulinen vegedog",
        "amount": 1,
        "toppings": "Tulinen kastike, Tulinen soijamakkara, Jalapenos, Avacados, Täysjyvä sämpylä"
    },
    {
        "hotdog_id": 2,
        "hotdog_name": "Gluteeniton vegedog",
        "amount": 2,
        "toppings": "Vegaaninen honey mustard, Soijamakkara, Paahdettu sipuli, Avacados, Gluteeniton sämpylä"
    },
]
 *
 */
orderRouter.route('/hotdogsAndToppings/:id').get(getHotdogsAndToppings);

/**
 * @api {get} /getOrderTotalPrice/:id Get prices of hotdogs with order id
 * @apiVersion 1.0.0
 * @apiName getOrderTotalPrice
 * @apiGroup Orders
 * @apiPermission all
 *
 * @apiDescription Get prices of hotdogs with order id
 *
 * @apiSuccess {Number} order_id Orders id
 * @apiSuccess {Number} hotdog_name Hotdogs name
 * @apiSuccess {Number} hotdog_id Hotdogs id
 * @apiSuccess {Number} hotdog_base_price Hotdogs base_price
 * @apiSuccess {Number} total_topping_price Hotdogs toppings total price
 * @apiSuccess {Number} hotdog_amount Hotdogs amount
 * @apiSuccess {Number} total_price Hotdogs total price
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
   {
        "order_id": 2,
        "hotdog_name": "Tulinen vegedog",
        "hotdog_id": 1,
        "hotdog_base_price": "10.00",
        "total_topping_price": "3.00",
        "hotdog_amount": 1,
        "total_price": "13.00"
    },
    {
        "order_id": 2,
        "hotdog_name": "Gluteeniton vegedog",
        "hotdog_id": 2,
        "hotdog_base_price": "14.00",
        "total_topping_price": "2.50",
        "hotdog_amount": 2,
        "total_price": "33.00"
    },
]
 *
 */
orderRouter.route('/orderTotalPrice/:id').get(getOrderTotalPrice);

/**
 * @api {put} /orderTotalPrice Update orders total price
 * @apiVersion 1.0.0
 * @apiName putOrderTotalPrice
 * @apiGroup Orders
 * @apiPermission all
 *
 * @apiDescription Update orders total price
 * 
 * @apiParam {Number} total_price New price of the order
 * @apiParam {Number} order_id Id of order
 *
 * @apiParamExample {json} Request-Example:
 *   {
    "total_price": 50.29,
    "order_id": 50
}
 *
 * @apiSuccess {String} message Message text
 * @apiSuccess {Object} result info
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
    "message": "Orders total price updated",
    "result": {
        "error": "Bind parameters must not contain undefined. To pass SQL NULL specify JS null"
    }
}
 *
 */
orderRouter.route('/orderTotalPrice').put(putOrderTotalPrice);

export default orderRouter;
