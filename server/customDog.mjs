const products = [
  {
    id: 1,
    label: "dryed onions",
    price: 0.1,
    productType: "toppings",
  },
  {
    id: 2,
    price: 0.5,
    productType: "toppings",
  },
  {
    id: 3,
    label: "tomatoes",
    price: 0.5,
    productType: "toppings",
  },
  {
    id: 4,
    label: "pickles",
    price: 0.79,
    productType: "toppings",
  },
  {
    id: 5,
    label: "cheese",
    price: 0.5,
    productType: "toppings",
  },
  {
    id: 6,
    label: "vegan cheese",
    price: 0.5,
    productType: "toppings",
  },
  {
    id: 7,
    label: "jalapenos",
    price: 0.5,
    productType: "toppings",
  },
  {
    id: 8,
    label: "avocado",
    price: 0.5,
    productType: "toppings",
  },
  {
    id: 9,
    label: "ketchup",
    price: 0.5,
    productType: "sauce",
  },
  {
    id: 10,
    label: "mustard",
    price: 0.5,
    productType: "sauce",
  },
  {
    id: 11,
    label: "mayo",
    price: 0.5,
    productType: "sauce",
  },
  {
    id: 12,
    label: "vegan mayo",
    price: 0.5,
    productType: "sauce",
  },
  {
    id: 12,
    label: "ranch",
    price: 0.5,
    productType: "sauce",
  },
  {
    id: 13,
    label: "hot sauce",
    price: 0.5,
    productType: "sauce",
  },
  {
    id: 14,
    label: "sriracha",
    price: 0.5,
    productType: "sauce",
  },
  {
    id: 15,
    label: "aioli",
    price: 0.5,
    productType: "sauce",
  },
  {
    id: 16,
    label: "chipotle",
    price: 0.5,
    productType: "sauce",
  },
  {
    id: 17,
    label: "Rye Bun",
    price: 1.5,
    productType: "bun",
  },
  {
    id: 18,
    label: "Wheat Bun",
    price: 1.15,
    productType: "bun",
  },
  {
    id: 19,
    label: "Gluten Free Bun",
    price: 1.5,
    productType: "bun",
  },
  {
    id: 20,
    label: "Whole Grain Bun",
    price: 1.5,
    productType: "bun",
  },
  {
    id: 21,
    label: "Pork Sausage",
    price: 2.5,
    productType: "sausage",
  },
  {
    id: 22,
    label: "Chicken Sausage",
    price: 2.15,
    productType: "sausage",
  },
  {
    id: 23,
    label: "spicy Sausage",
    price: 2.5,
    productType: "sausage",
  },
  {
    id: 24,
    label: "Vegan Sausage",
    price: 2.5,
    productType: "sausage",
  },
  {
    id: 25,
    label: "coke",
    price: 1.5,
    productType: "beverage",
  },
  {
    id: 26,
    label: "diet coke",
    price: 1.5,
    productType: "beverage",
  },
  {
    id: 27,
    label: "sprite",
    price: 1.5,
    productType: "beverage",
  },
  {
    id: 28,
    label: "water",
    price: 0.9,
    productType: "beverage",
  },
  {
    id: 29,
    label: "lemonade",
    price: 2.5,
    productType: "beverage",
  },
  {
    id: 30,
    label: "sipcy vegan hot dog",
    price: 2.5,
    description:
      "spicy vegan hot dog with spicy vegan sausage, jalapenos, and spicy sauce",
    productType: "hotdog",
  },
  {
    id: 31,
    label: "vegan hot dog",
    price: 2.5,
    description: "vegan hot dog with vegan sausage, and vegan sauce",
    productType: "hotdog",
  },
  {
    id: 32,
    label: "spicy hot dog",
    price: 2.5,
    description: "spicy hot dog with spicy sausage, jalapenos, and spicy sauce",
    productType: "hotdog",
  },
  {
    id: 33,
    label: "hot dog",
    price: 2.5,
    description: "hot dog with sausage, and sauce",
    productType: "hotdog",
  },
  {
    id: 38,
    label: "spicy vegan hot dog",
    price: 2.5,
    description:
      "spicy vegan hot dog with spicy vegan sausage, jalapenos, and spicy sauce",
    productType: "hotdog",
  },
  {
    id: 39,
    label: "vegan hot dog",
    price: 2.5,
    description: "vegan hot dog with vegan sausage, and vegan sauce",
    productType: "hotdog",
  },
  {
    id: 40,
    label: "spicy hot dog",
    price: 2.5,
    description: "spicy hot dog with spicy sausage, jalapenos, and spicy sauce",
    productType: "hotdog",
  },
];

/**
 * gets all of beverage options
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - beverage options
 */
const getProducts = (req, res) => {
  res.json(products);
};

/**
 * makes new beverage
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - beverage options
 */
const postCustom = (req, res) => {
  if (req.body) {
    custom.push({
      id: req.body.id,
      label: req.body.label,
      price: req.body.price,
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

/**
 * updates beverage
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - beverage options
 */
const updateCustom = (req, res) => {
  const customItem = custom.find((item) => item.id == req.params.id);
  if (customItem) {
    customItem.id = req.body.id;
    customItem.label = req.body.label;
    customItem.price = req.body.price;
    res.json(custom);
  } else {
    res.status(404).send("Bun not found");
  }
};

/**
 * deletes beverage
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - beverage options
 */
const deleteCustomItem = (req, res) => {
  const deleteCustomItem = custom.find((item) => item.id == req.params.id);
  if (deleteCustomItem) {
    custom.splice(custom.indexOf(deleteCustomItem), 1);
    res.json(custom);
  } else {
    res.status(404).send("Bun not found");
  }
};

export { getProducts };
