const express = require("express");
const router = express.Router();

router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out" });
});

module.exports = router;
