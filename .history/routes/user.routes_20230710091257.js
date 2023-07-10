const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");
const { addUsers } = require("../database.js");

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
  const user = await addUsers(name, email, hashedPassword);
  if (user[0].affectedRows === 1) {
    res
      .status(200)
      .json({ status: "Account Successfully Created", user_id: user[0].id });
  } else {
    res.status(400).json({ message: "User not added" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await db.query("SELECT * FROM users where email = ?", [
    email,
  ]);
  if (existingUser[0].length === 0) {
    res.status(400).json({ message: "User does not exist" });
  }
  const isValid = await utils.validPassword(
    existingUser[0][0].password,
    password
  );
  if (isValid) {
    const tokenObject = utils.issueJWT(existingUser[0][0]);
    res.cookie("jwt", tokenObject.token, { httpOnly: true });
    res.status(200).json({
      success: true,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
    });
  } else {
    res
      .status(401)
      .json({ status: "Incorrect username/password provided. Please retry" });
  }
});

export default router;
