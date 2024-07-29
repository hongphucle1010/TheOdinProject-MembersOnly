const express = require("express");
const router = express.Router();
const {
  logInController,
} = require("../../controllers/UserControllers/LogInController");

router.get("/", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("login", {
    title: "Log In",
    message: req.flash("error") || "Log in to access the Members Only page.",
  });
});

router.post("/", logInController);

module.exports = router;
