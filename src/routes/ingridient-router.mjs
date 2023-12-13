import express from 'express';
import { customIngriedirents } from '../controllers/ingridient-controller.mjs';

const customRouter = express.Router();

/**
 *@api {get} /ingridients Get ingridients
 *@apiVersion 1.0.0
 *@apiName Get ingridients
 *@apiGroup Ingridients
 *@apiPermission all
 *
 *
 *@apiDescription This route fetches all ingridients
 *
 *@apiSuccess {String} ingridient_id Id of the ingridient
 *@apiSuccess {String} ingridient_name Name of the ingridient
 *@apiSuccess {String} ingridient_type Type of the ingridient
 *@apiSuccess {String} ingridient_price Price of the ingridient
 *@apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *  [
 *    {
 * "ingridient_id": 1,
 * "ingridient_name": "Täysjyvä sämpylä",
 * "ingridient_type": "Sämpylä",
 * "ingridient_price": 1.00
 * },
 * {
 * "ingridient_id": 2,
 * "ingridient_name": "Vegaani makkara",
 * "ingridient_type": "Makkara",
 * "ingridient_price": 1
 * },
 * {
 * "ingridient_id": 3,
 * "ingridient_name": "Ketchup",
 * "ingridient_type": "Sauce",
 * "ingridient_price": 1
 * }
 * ]
 *
 */
customRouter.route('/').get(customIngriedirents).post();

export default customRouter;
