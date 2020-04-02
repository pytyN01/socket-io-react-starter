const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server Active");
});

module.exports = router;
