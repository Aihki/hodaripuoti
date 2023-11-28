import express from "express";
import { chef } from "../controllers/chef-controller.mjs";

const chefRouter = express.Router();

chefRouter.route("/").get(chef);

export default chefRouter;
