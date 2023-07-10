const express = require("express");
const router = express.Router();
const { addTrains } = require("../database.js");

router.post("/create", async (req, res) => {
  const {
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination,
  } = req.body;

  const train = await addTrains(
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination
  );
});

router.get("/availability", async (req, res) => {
  const source = req.query.source;
  const destination = req.query.destination;
});

module.exports = router;
