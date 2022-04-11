const express = require("express");
const app = express();
const routes = require("./route");
const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Some Error in connecting mongoDB.\n", err);
  });

app.use(routes);

app.listen(PORT, () => {
  console.log("Server is running on Port : ", PORT);
});
