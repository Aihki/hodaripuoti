import express from "express";
import {
  chef,
  postMenuItem,
  putMenuItem,
} from "../controllers/chef-controller.mjs";

const chefRouter = express.Router();

/**
 * @api {get} /api/menu
 * @apiName Get menu
 * @apiGroup Menu
 * @apiVersion 1.0.0
 * @apiPermission all
 * 
 * @apiDescription This route fetches all chef
 * 

 * @apiSuccess {String} menu item id
 * @apiSuccess {String} Menu item name
 * @apiSuccess {String} menu item ingredients
 * @apiSuccess {String} menu item price
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 * {
 * "menu_item_id": 1,
 * "menu_item_name": "Vege hotdog",
 * "menu_item_ingredients": "Täysjyvä sämpylä, Vegaani makkara, Ketchup",
 * "menu_item_price": 3
 * },
 * {
 * "menu_item_id": 2,
 * "menu_item_name": "pretzel hotdog",
 * "menu_item_ingredients": "Pretzel sämpylä, Vegaani makkara, Ketchup",
 * "menu_item_price": 3
 * }
 * ]
 * 
*/

/**
 * @api {post} /api/menu
 * @apiName Post menu item
 * @apiGroup Menu
 * @apiVersion 1.0.0
 *
 * @apiDescription This route posts a new menu item
 *
 * @apiParam {String} menu item name
 * @apiParam {String} menu item price
 * @apiParam {object} menu item ingredients id
 *
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * message: menu item added
 * }
 *
 *
 */
chefRouter.route("/").get(chef).post(postMenuItem);

/**
 * @api {put} /api/menu/:id
 * @apiName Put menu item
 * @apiGroup Menu
 * @apiVersion 1.0.0
 *
 * @apiDescription This route updates a menu item
 *
 * @apiParam {String} menu item name
 * @apiParam {String} menu item price
 *
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * message: menu item updated
 * }
 *
 *
 */

chefRouter.route("/:id").put(putMenuItem);

export default chefRouter;
