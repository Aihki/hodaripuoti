import express from "express";
import { beverage } from "../controllers/beverage-controller.mjs";

const beverageRouter = express.Router();

beverageRouter.route("/beverage").get(beverage);

export default beverageRouter;
