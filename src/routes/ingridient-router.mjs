import express from "express";
import {
  addIngrident,
  customIngriedirents,
} from "../controllers/ingridient-controller.mjs";

const customRouter = express.Router();

customRouter.route("/products").get(customIngriedirents).post(addIngrident);

export default customRouter;
