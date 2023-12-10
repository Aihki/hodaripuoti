import { json } from "express";
import { getProducts, updateIngrident } from "../models/ingridient-model.mjs";

const customIngriedirents = async (req, res) => {
  const ingredients = await getProducts();
  if (!ingredients.error) {
    res.json(ingredients);
    console.log(ingredients);
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const postIngridient = async (req, res) => {
  try {
    const ingredients = [
      req.body.topping_name,
      req.body.topping_type,
      req.body.price,
    ];
    const result = await newIngrident(ingredients);
    if (!result) {
      res.status(404);
      return;
    }
    res.status(200);
    res.json(result);
    res.json({ message: "Ingrident added" });
  } catch (error) {
    console.log("error", error.message);
  }
};

const putIngridient = async (req, res) => {
  const ingridient = req.params.id;
  try {
    const result = await updateIngrident(ingridient, req.body);
    if (!result) {
      res.status(404);
      return;
    }
    res.status(200);
    res.json(result);
    res.json({ message: "Ingrident updated" });
  } catch (error) {
    console.log("error", error.message);
  }
};

const deleteIngridientById = async (req, res) => {
  try {
    const result = await deleteIngrident(req.params.id);
    if (!result) {
      res.status(404);
      return;
    }
    res.status(200);
    res.json({ message: "Ingrident deleted" });
  } catch (error) {
    console.log("error", error.message);
  }
};

export { customIngriedirents, postIngridient };
