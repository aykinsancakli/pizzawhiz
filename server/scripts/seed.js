const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Pizza = require("../models/Pizza");

dotenv.config({ path: "./.env" });

console.log(process.env.DATABASE);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connection Successful!");

    // Read the pizza data from the JSON file
    const pizzaData = fs.readFileSync("./devdata/pizzas.json");
    const pizzas = JSON.parse(pizzaData);

    return Pizza.insertMany(pizzas);
  })
  .then(() => {
    console.log("Pizzas added successfully!");
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error adding pizzas:", err);
    return mongoose.connection.close();
  });
