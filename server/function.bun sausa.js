const sausageOptions = [
  {
    id: 1,
    label: "Pork Sausage",
    price: 2.5,
  },
  {
    id: 2,
    label: "Chicken Sausage",
    price: 2.15,
  },
  {
    id: 3,
    label: "spicy Sausage",
    price: 2.5,
  },
  {
    id: 4,
    label: "Vegan Sausage",
    price: 2.5,
  },
];

/**
 * gets all of sausages options
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - sausage options
 */
const getSausageOptions = (req, res) => {
  res.json(sausageOptions);
};

/**
 * post new sausage
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - sausage options
 */
const postSausageOptions = (req, res) => {
  if (req.body) {
    sausageOptions.push({
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
 * update sausage
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - sausage options
 */
const updateSausageOptions = (req, res) => {
  const sausage = beveragesOptions.find(
    (sausage) => sausage.id == req.params.id
  );
  if (sausage) {
    sausage.id = req.body.id;
    sausage.label = req.body.label;
    sausage.price = req.body.price;
    res.json(sausageOptions);
  } else {
    res.status(404).send("Bun not found");
  }
};

/**
 * delete sausage
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - sausage options
 */
const deleteSausageOptions = (req, res) => {
  const deleteSausage = sausageOptions.find(
    (sausage) => sausage.id == req.params.id
  );
  if (deleteSausage) {
    sausageOptions.splice(sausageOptions.indexOf(deleteSausage), 1);
    res.json(sausageOptions);
  } else {
    res.status(404).send("Bun not found");
  }
};

export { getSausageOptions };
