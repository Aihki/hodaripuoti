import express from "express";
import cors from "cors";
import customRouter from "./routes/ingridient-router.mjs";
import beverageRouter from "./routes/beverage-router.mjs";
import chefRouter from "./routes/chef-router.mjs";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src"));
app.use("/css", express.static(path.join(__dirname, "./css")));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/ingridients", customRouter);
app.use("/api/beverage", beverageRouter);
app.use("/api/menu", chefRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
