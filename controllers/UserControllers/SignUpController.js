const { createUser } = require("../../models/UserModel/UserModel");
const { body, validationResult } = require("express-validator");

const signUpValidation = [
  body("username")
    .isLength({ min: 5 })
    .withMessage("Username is too short")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty"),
  body("password").isLength({ min: 2 }).withMessage("Password is too short"),
];

const signUpController = [
  signUpValidation,
  async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    const validationErrors = validationResult(req)
      .errors.map((error) => error.msg)
      .join(". ");

    // Add the validation errors to the user error message
    if (validationErrors) {
      user.error = user.error
        ? `${user.error}. ${validationErrors}`
        : validationErrors;
    }

    if (user.error) {
      res.render("signup", {
        title: "Sign Up",
        message: user.error,
      });
    } else res.redirect("/");
  },
];

module.exports = { signUpController };
