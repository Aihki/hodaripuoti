const toppingsOptions = [
  {
    id: 1,
    label: "dryed onions",
    price: 0.5,
  },
  {
    id: 2,
    label: "fresh onions",
    price: 0.5,
  },
  {
    id: 3,
    label: "tomatoes",
    price: 0.5,
  },
  {
    id: 4,
    label: "pickles",
    price: 0.5,
  },
  {
    id: 5,
    label: "cheese",
    price: 0.5,
  },
  {
    id: 6,
    label: "vegan cheese",
    price: 0.5,
  },
  {
    id: 7,
    label: "jalapenos",
    price: 0.5,
  },
  {
    id: 8,
    label: "avocado",
    price: 0.5,
  },
];
/**
 * gets all of menu items
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - bun options
 */
const getToppingsOptions = (req, res) => {
  res.json(toppingsOptions);
};

/**
 * post new topping
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - topping options
 */
const postToppingsOptions = (req, res) => {
  if (req.body) {
    toppingsOptions.push({
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
 * update topping
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - topping options
 */
const updateToppingsOptions = (req, res) => {
  const toppings = toppingsOptions.find(
    (topping) => topping.id == req.params.id
  );
  if (toppings) {
    toppings.id = req.body.id;
    toppings.label = req.body.label;
    toppings.price = req.body.price;
    res.json(toppingsOptions);
  } else {
    res.status(404).send("Bun not found");
  }
};

/**
 * delete existing topping
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - topping options
 */
const deleteToppingsOptions = (req, res) => {
  const deleteTopping = toppingsOptions.find(
    (topping) => topping.id == req.params.id
  );
  if (deleteTopping) {
    toppingsOptions.splice(toppingsOptions.indexOf(deleteTopping), 1);
    res.json(toppingsOptions);
  } else {
    res.status(404).send("Bun not found");
  }
};
export { getToppingsOptions };
