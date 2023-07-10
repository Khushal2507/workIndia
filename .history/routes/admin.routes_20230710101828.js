const express = require("express");
const router = express.Router();
const {addTrains} = require("../database.js");

router.post("/trains/create", (req, res) => {
  const {
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination,
  } = req.body;

    const train = await addTrains(train_name, source, destination, seat_capacity, arrival_time_at_source, arrival_time_at_destination);

});
