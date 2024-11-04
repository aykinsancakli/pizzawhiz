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

    // Calculate estimated delivery time (testing => 30 seconds from now)
    const estimatedDelivery = new Date(Date.now() + 30 * 1000);

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

    // Save order to the db
    const savedOrder = await newOrder.save();

    // Simulate status change to "delivered" after 30 seconds for testing
    const randomDelay = 30 * 1000;
    setTimeout(async () => {
      savedOrder.status = "delivered";
      await savedOrder.save(); // Update status in db
    }, randomDelay);

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
