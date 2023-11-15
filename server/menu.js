import express from "express";
import cors from "cors";
import { getBeveragesOptions } from "./beverage.js";
import { getMenuOptions } from "./chefChoice.js";
import { getCustom } from "./customDog.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/custom", getCustom);
app.get("/api/beverages", getBeveragesOptions);
app.get("/api/menu", getMenuOptions);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
