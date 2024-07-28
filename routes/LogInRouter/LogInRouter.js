const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", {
    title: "Log In",
    message: "Log in to access the Members Only page.",
  });
});

module.exports = router;