const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("signup", {
    title: "Sign Up",
    message: "Sign up to access the Members Only page.",
  });
});

module.exports = router;
