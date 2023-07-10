const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await db.query("SELECT * FROM users where email = ?", [email]))
});

export default router;
