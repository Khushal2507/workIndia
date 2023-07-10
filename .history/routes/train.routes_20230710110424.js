const express = require("express");
const router = express.Router();
const { addTrains, getTrains } = require("../database.js");

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
  if (!train) {
    res.status(400).json({ message: "Train not added" });
  }
  res.status(200).json({
    status: "Train Successfully Created",
    train: train,
  });
});

router.get("/availability", async (req, res) => {
  const source = req.query.source;
  const destination = req.query.destination;

  const trains = await getTrains(source, destination);
  res.status(200).json({
    status: "Success",
    status_code: 200,
    trains: trains,
  });
});

module.exports = router;
