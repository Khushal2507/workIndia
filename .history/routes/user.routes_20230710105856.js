const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");
const { addUsers, getUserByEmail } = require("../database.js");
const passport = require("passport");
require("../utils/passport")(passport);

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await getUserByEmail(email);
  if (existingUser[0].length > 0) {
    res.status(400).json({ message: "User already exists" });
  } else {
    const passwordSalt = await utils.createSalt();
    const hashedPassword = await utils.createPassword(password, passwordSalt);
    const user = await addUsers(name, email, hashedPassword);
    if (!user) {
      res.status(400).json({ message: "User not added" });
    } else {
      res.status(200).json({
        status: "Account Successfully Created",
        user: user,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await getUserByEmail(email);
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
      status: "Login Successful",
      status_code: 200,
      user: existingUser[0][0],
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
    });
  } else {
    res
      .status(401)
      .json({ status: "Incorrect username/password provided. Please retry" });
  }
});

router.get(
  "/home",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ message: "You made it to the secure route" });
  }
);

module.exports = router;
