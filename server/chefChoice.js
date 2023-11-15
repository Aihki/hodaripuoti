const menuOptions = [
  {
    id: 1,
    label: "spicy hot dog",
    price: 5.5,
    ingredient: [
      "wheat bun",
      "spicy sausage",
      "jalapenos",
      "avocado",
      "hot sauce",
      "sriracha",
    ],
  },
  {
    id: 2,
    label: "vegan hot dog",
    price: 5.5,
    ingredient: [
      "gluten free bun",
      "vegan sausage",
      "vegan cheese",
      "tomatoes",
      "avocado",
      "chipotle",
    ],
  },
  {
    id: 3,
    label: "classic hot dog",
    price: 5.5,
    ingredient: [
      "rye bun",
      "pork sausage",
      "cheese",
      "pickles",
      "ketchup",
      "mustard",
    ],
  },
  {
    id: 4,
    label: "chicken hot dog",
    price: 5.5,
    ingredient: [
      "whole grain bun",
      "chicken sausage",
      "dryed onions",
      "tomatoes",
      "mayo",
      "ranch",
    ],
  },
];

/**
 * gets all of menu items
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - menu options
 */
const getMenuOptions = (req, res) => {
  res.json(menuOptions);
};

/**
 * post new menu item
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - menu options
 */
const postMenuOptions = (req, res) => {
  if (req.body) {
    menuOptions.push({
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
 * updates menu item
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - menu options
 */
const updateMenuptions = (req, res) => {
  const menu = menuOptions.find((menuItem) => menuItem.id == req.params.id);
  if (menu) {
    menu.id = req.body.id;
    menu.label = req.body.label;
    menu.price = req.body.price;
    res.json(menuOptions);
  } else {
    res.status(404).send("Bun not found");
  }
};

/**
 * delete menu item
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} - menu options
 */
const deleteMenuOptions = (req, res) => {
  const deleteMenuItem = menuOptions.find(
    (menuItem) => menuItem.id == req.params.id
  );
  if (deleteMenuItem) {
    menuOptions.splice(menuOptions.indexOf(deleteMenuItem), 1);
    res.json(menuOptions);
  } else {
    res.status(404).send("Bun not found");
  }
};

export { getMenuOptions };
