const sauceOptions = [
  {
    id: 1,
    label: "ketchup",
    price: 0.5,
  },
  {
    id: 2,
    label: "mustard",
    price: 0.5,
  },
  {
    id: 3,
    label: "mayo",
    price: 0.5,
  },
  {
    id: 4,
    label: "vegan mayo",
    price: 0.5,
  },
  {
    id: 5,
    label: "ranch",
    price: 0.5,
  },
  {
    id: 6,
    label: "hot sauce",
    price: 0.5,
  },
  {
    id: 7,
    label: "sriracha",
    price: 0.5,
  },
  {
    id: 8,
    label: "aioli",
    price: 0.5,
  },
  {
    id: 9,
    label: "chipotle",
    price: 0.5,
  },
];
/**
 * gets all of sauce items
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - sauce options
 */
const getSauceOptions = (req, res) => {
  res.json(sauceOptions);
};

/**
 * post new sauce
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - sauce options
 */
const postSauceOptions = (req, res) => {
  if (req.body) {
    sauceOptions.push({
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
 * update existing sauce
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - sauce options
 */
const updateSauceOptions = (req, res) => {
  const sauce = sauceOptions.find((sauce) => sauce.id == req.params.id);
  if (sauce) {
    sauce.id = req.body.id;
    sauce.label = req.body.label;
    sauce.price = req.body.price;
    res.json(sauceOptions);
  } else {
    res.status(404).send("Bun not found");
  }
};

/**
 * delete existing sauce
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - sauce options
 */
const deleteSauceOptions = (req, res) => {
  const deleteSauce = sauceOptions.find((sauce) => sauce.id == req.params.id);
  if (deleteSauce) {
    sauceOptions.splice(sauceOptions.indexOf(deleteSauce), 1);
    res.json(sauceOptions);
  } else {
    res.status(404).send("Bun not found");
  }
};

export { getSauceOptions };
