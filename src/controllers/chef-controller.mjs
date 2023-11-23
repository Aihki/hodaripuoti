import { getChefChoices } from "../models/chef-model.mjs";

const chef = async (req, res) => {
  try {
    const ingredients = await getChefChoices();
    if (ingredients.error) {
      res.status(500).json({ error: ingredients.error });
    } else {
      res.json(ingredients);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBeverage = async (req, res) => {
  const { topping_name, topping_type, price } = req.body;
  if (topping_name && topping_type && price) {
    try {
      const ingredients = {
        topping_name,
        topping_type,
        price,
      };
      const result = await newIngrident(ingredients);
      if (result.error) {
        res.status(500).json({ error: result.error });
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400);
  }
};

export { chef };
