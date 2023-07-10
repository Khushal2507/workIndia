const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");

const userRoutes = require("./routes/user.routes");

initializingPassport(passport);

app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});
