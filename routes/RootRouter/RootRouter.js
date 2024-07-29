const express = require("express");
const { use } = require("passport");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    message:
      "Welcome to the ClubHouse! You can only see this page if you are a member.",
    user: req.user
  });
});

module.exports = router;
