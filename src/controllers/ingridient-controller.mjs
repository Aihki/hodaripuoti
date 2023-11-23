import { getProducts, newIngrident } from "../models/ingridient-model.mjs";

const customIngriedirents = async (req, res) => {
  try {
    const ingredients = await getProducts();
    console.log(ingredients);
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
