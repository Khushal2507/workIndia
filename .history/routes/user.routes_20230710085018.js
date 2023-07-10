const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const salt = utils.createSalt();
  const hashedPassword = utils.createPassword(password, salt);
  const user = {
    name: name,
    email: email,
    password: hashedPassword,
    salt: salt,
  };
  console.log(user);
  res.json(user);
});

export default router;
