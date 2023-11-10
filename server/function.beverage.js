const beveragesOptions = [
  {
    id: 1,
    label: "coke",
    price: 1.5,
  },
  {
    id: 2,
    label: "diet coke",
    price: 1.5,
  },
  {
    id: 3,
    label: "sprite",
    price: 1.5,
  },
  {
    id: 4,
    label: "water",
    price: 1.5,
  },
  {
    id: 5,
    label: "lemonade",
    price: 1.5,
  },
];

/**
 * gets all of beverage options
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - beverage options
 */
const getBeveragesOptions = (req, res) => {
  res.json(beveragesOptions);
};

/**
 * makes new beverage
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - beverage options
 */
const postBeveragesOptions = (req, res) => {
  if (req.body) {
    beveragesOptions.push({
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
const updateBeveragesOptions = (req, res) => {
  const beverage = beveragesOptions.find(
    (beverage) => beverage.id == req.params.id
  );
  if (beverage) {
    beverage.id = req.body.id;
    beverage.label = req.body.label;
    beverage.price = req.body.price;
    res.json(beveragesOptions);
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
const deleteBeveragesOptions = (req, res) => {
  const deleteBeverage = beveragesOptions.find(
    (beverage) => beverage.id == req.params.id
  );
  if (deleteBeverage) {
    beveragesOptions.splice(beveragesOptions.indexOf(deleteBeverage), 1);
    res.json(beveragesOptions);
  } else {
    res.status(404).send("Bun not found");
  }
};

export { getBeveragesOptions };
