const express = require("express");
const router = express.Router();
const {
  signUpController,
} = require("../../controllers/UserControllers/SignUpController");

router.get("/", (req, res) => {
  res.render("signup", {
    title: "Sign Up",
    message: "Sign up to access the Members Only page.",
  });
});

router.post("/", signUpController);

module.exports = router;
