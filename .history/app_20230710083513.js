const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
