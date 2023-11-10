const bunOptions = [
  {
    id: 1,
    label: "Rye Bun",
    price: 1.5,
  },
  {
    id: 2,
    label: "Wheat Bun",
    price: 1.15,
  },
  {
    id: 3,
    label: "Gluten Free Bun",
    price: 1.5,
  },
  {
    id: 4,
    label: "Whole Grain Bun",
    price: 1.5,
  },
];

/**
 * gets all of bun options
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - bun options
 */
const getBunOptions = (req, res) => {
  res.json(bunOptions);
};

/**
 * post new bun
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - bun options
 */
const postBunOptions = (req, res) => {
  if (req.body) {
    bunOptions.push({
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
 * update existing bun
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - bun options
 */
const updateBunOptions = (req, res) => {
  const bun = bunOptions.find((bun) => bun.id == req.params.id);
  if (bun) {
    bun.id = req.body.id;
    bun.label = req.body.label;
    bun.price = req.body.price;
    res.json(bunOptions);
  } else {
    res.status(404).send("Bun not found");
  }
};
/**
 * delete bun option
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - bun options
 */
const deleteBunOptions = (req, res) => {
  const deleteBun = bunOptions.find((bun) => bun.id == req.params.id);
  if (deleteBun) {
    bunOptions.splice(bunOptions.indexOf(deleteBun), 1);
    res.json(bunOptions);
  } else {
    res.status(404).send("Bun not found");
  }
};

export { getBunOptions, postBunOptions, updateBunOptions, deleteBunOptions };
