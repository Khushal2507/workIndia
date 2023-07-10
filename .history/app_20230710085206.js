const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");
const passport = require("passport");

initializingPassport(passport);

const db = mysql
  .createConnection({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: "localhost",
    database: "workindia",
  })
  .promise();

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});

app.use(express.json());
app.use(cookieParser());

app.use("/api");
