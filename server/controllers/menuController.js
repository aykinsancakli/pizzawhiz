const Pizza = require("../models/Pizza");

exports.getMenu = async (req, res) => {
  try {
    const data = await Pizza.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching pizzas:", error);
    res.status(500).json({ message: "Error fetching pizzas" });
  }
};
