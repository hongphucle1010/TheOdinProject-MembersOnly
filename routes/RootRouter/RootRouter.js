const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    message:
      "Welcome to the Members Only page! You can only see this page if you are a member.",
  });
});

module.exports = router;
