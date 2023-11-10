import express from "express";
import cors from "cors";
import {
  deleteBunOptions,
  getBunOptions,
  postBunOptions,
  updateBunOptions,
} from "./function.bun.js";
import { getSausageOptions } from "./function.bun sausa.js";
import { getToppingsOptions } from "./function.toppings.js";
import { getSauceOptions } from "./function.sauce.js";
import { getBeveragesOptions } from "./function.beverage.js";
import { getMenuOptions } from "./function.menu.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/bun", getBunOptions);
app.delete("/api/bun/:id", deleteBunOptions);
app.post("/api/bun", postBunOptions);
app.put("/api/bun/:id", updateBunOptions);

app.get("/api/sausage", getSausageOptions);
app.get("/api/toppings", getToppingsOptions);
app.get("/api/sauce", getSauceOptions);
app.get("/api/beverages", getBeveragesOptions);
app.get("/api/menu", getMenuOptions);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
