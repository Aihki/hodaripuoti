import express from "express";
import { beverage } from "../controllers/beverage-controller.mjs";

const beverageRouter = express.Router();

beverageRouter.route("/").get(beverage);

export default beverageRouter;
