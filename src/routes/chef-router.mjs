import express from "express";
import { chef, putMenuItem } from "../controllers/chef-controller.mjs";

const chefRouter = express.Router();

chefRouter.route("/").get(chef);

chefRouter.route("/:id").put(putMenuItem);

export default chefRouter;
