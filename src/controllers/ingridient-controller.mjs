import { getProducts, newIngrident } from "../models/ingridient-model.mjs";

const customIngriedirents = async (req, res) => {
  const ingredients = await getProducts();
  if (!ingredients.error) {
    res.json(ingredients);
    console.log(ingredients);
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addIngrident = async (req, res) => {
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

export { customIngriedirents, addIngrident };
