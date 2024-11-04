const express = require("express");
const menuController = require("../controllers/menuController");

const router = express.Router();

router.route("/").get(menuController.getPizzas);

module.exports = router;
