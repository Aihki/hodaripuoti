import { getChefChoices, updateChefChoice } from "../models/chef-model.mjs";

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
  console.log("req.body", req.body);
  const menuItem = req.params.id;
  const result = await updateChefChoice(menuItem, req.body);
  if (result.error) {
    res
      .status(404)
      .json({ error: result.error, message: "Menu Item not found" });
    return;
  }
  res.status(200).json({ message: "Menu Item updated" });
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

export { chef, putMenuItem };
