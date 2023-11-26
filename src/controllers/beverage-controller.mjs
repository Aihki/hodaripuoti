import { getBeverage } from "../models/beverage-model.mjs";

const beverage = async (req, res) => {
  const drink = await getBeverage();
  if (!drink.error) {
    res.json(drink);
  } else {
    res.status(500).json({ message: "Something went wrong" });
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

export { beverage };
