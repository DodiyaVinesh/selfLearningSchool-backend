const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const routes = require("./route");

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());

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
