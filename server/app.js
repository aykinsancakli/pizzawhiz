const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT_PRODUCTION_URL
      : process.env.CLIENT_DEVELOPMENT_URL,
};
app.use(cors(corsOptions));

// Routes
app.get("/api", (req, res) => {
  res.status(200).json({ fruits: ["apple", "banana", "pineapple"] });
});

module.exports = app;
