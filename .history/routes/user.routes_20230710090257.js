const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");
const {addUsers} = require("../database/database");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await db.query("SELECT * FROM users where email = ?", [
    email,
  ]);
  if (existingUser[0].length > 0) {
    res.status(400).json({ message: "User already exists" });
  }

  const passwordSalt = await utils.createSalt();
  const hashedPassword = await utils.createPassword(password, passwordSalt);
  const user
});

export default router;
