const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);

app.listen("5000", (req, res) => {
  console.log("Server is running on port 5000");
});
