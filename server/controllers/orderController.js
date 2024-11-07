const Order = require("../models/Order");
const generateOrderId = require("../utils/helpers");

exports.createOrder = async (req, res) => {
  try {
    const { customer, phone, address, cart, priority } = req.body;

    // Calculate total price for the order
    let orderPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);

    // Calculate the priority price if priority is true
    const priorityPrice = priority ? orderPrice * 0.2 : 0;

    // Generate custom order ID
    const orderId = generateOrderId();

    // Generate a random estimated delivery time
    const randomDelay = Math.floor(Math.random() * (50 - 30 + 1) + 30); // Between 30 to 50 minutes
    const estimatedDelivery = new Date(Date.now() + randomDelay * 60 * 1000); // Convert minutes to ms

    // Create a new order object
    const newOrder = new Order({
      customer,
      phone,
      address,
      cart: cart.map((item) => ({
        pizzaId: item.pizzaId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      })),
      id: orderId,
      estimatedDelivery,
      orderPrice,
      priority,
      priorityPrice,
    });

    // Save the order to the DB
    const savedOrder = await newOrder.save();

    // Simulate status change to "delivered" after the estimated delivery time
    setTimeout(async () => {
      savedOrder.status = "delivered";
      await savedOrder.save(); // Update status in DB
    }, randomDelay * 60 * 1000);

    // Send success response
    res.status(201).json({
      status: "success",
      data: savedOrder,
    });
  } catch (error) {
    console.error("Error creating the order:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order in db
    const order = await Order.findOne({ id });

    // Check if the order exists
    if (!order) {
      return res
        .status(404)
        .json({ status: "error", message: "Order not found" });
    }

    // Send success message with the found order
    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body; // This will always be true

    // Find the order in the DB by ID
    const order = await Order.findOne({ id });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    const priorityPrice = order.orderPrice * 0.2;

    // Update the order with priority information
    order.priority = priority;
    order.priorityPrice = priorityPrice;

    // Save the updated order to the DB
    const updatedOrder = await order.save();

    res.status(200).json({
      status: "success",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating the order:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
