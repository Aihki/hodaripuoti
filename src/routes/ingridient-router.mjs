import express from "express";
import { customIngriedirents } from "../controllers/ingridient-controller.mjs";

const customRouter = express.Router();

customRouter.route("/").get(customIngriedirents).post();

export default customRouter;
