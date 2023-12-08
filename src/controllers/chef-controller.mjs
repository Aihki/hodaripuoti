import {
  getChefChoices,
  newChefChoice,
  updateChefChoice,
} from "../models/chef-model.mjs";

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
    const { hotdog_name, base_price, topping_ids } = req.body; // Ota tiedot pyynnön mukana tulevasta bodysta
    const menuItem = { hotdog_name, base_price, topping_ids }; // Luo menuItem-objekti

    const result = await newChefChoice(menuItem);
    if (!result || result.error) {
      res.status(404).json({ message: "Error adding menu item" });
      return;
    }
    res.status(200).json({ message: "Menu Item added" }); // Vastaa, kun hotdog ja toppingit on lisätty onnistuneesti
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

export { chef, putMenuItem, postMenuItem };
