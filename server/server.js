const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const mongoose = require("mongoose");
const app = require("./app");

// Connect to MongoDB
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.error("DB Connection Error:", err));

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
