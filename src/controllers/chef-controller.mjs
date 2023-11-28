import { getChefChoices } from "../models/chef-model.mjs";

const chef = async (req, res) => {
  const menuItem = await getChefChoices();
  if (!menuItem.error) {
    res.json(menuItem);
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const postMenuItem = async (req, res) => {
  try {
    const menuItem = [
      req.body.topping_name,
      req.body.topping_type,
      req.body.price,
    ];
    const result = await newChefChoice(menuItem);
    if (!result) {
      res.status(404);
      return;
    }
    res.status(200);
    res.json(result);
    res.json({ message: "Menu Item added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putMenuItem = async (req, res) => {
  try {
    const menuItem = [
      req.body.topping_name,
      req.body.topping_type,
      req.body.price,
    ];
    const result = await updateChefChoice(menuItem);
    if (!result) {
      res.status(404);
      return;
    }
    res.status(200);
    res.json(result);
    res.json({ message: "Menu Item updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteMenuItemById = async (req, res) => {
  try {
    const result = await deleteChefChoice(req.params.id);
    if (!result) {
      res.status(404);
      return;
    }
    res.status(200);
    res.json(result);
    res.json({ message: "Menu Item deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { chef };
