const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.route("/").post(orderController.createOrder);
router
  .route("/:id")
  .get(orderController.getOrder)
  .patch(orderController.updateOrder);

module.exports = router;
