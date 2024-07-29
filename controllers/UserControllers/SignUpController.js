const { createUser } = require("../../models/UserModel/UserModel");

const signUpController = async (req, res) => {
  const { username, password } = req.body;
  const user = await createUser(username, password);
  if (user.error) {
    res.render("signup", {
      title: "Sign Up",
      message: user.error,
    });
  } else res.redirect("/");
};

module.exports = { signUpController };
