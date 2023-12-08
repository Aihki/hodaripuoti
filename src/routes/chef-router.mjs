import express from "express";
import {
  chef,
  postMenuItem,
  putMenuItem,
} from "../controllers/chef-controller.mjs";

const chefRouter = express.Router();

chefRouter.route("/").get(chef).post(postMenuItem);

chefRouter.route("/:id").put(putMenuItem);

export default chefRouter;
