const express = require("express");
const router = express.Router();

router.post("/trains/create", (req, res) => {
  res.send("Create a train");
});
