const { findUser, findUserById } = require("../../models/UserModel/UserModel");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await findUser(username);
      if (result.error) {
        return done(result.error);
      }
      if (!result.data) {
        return done(null, false, { message: "Incorrect username" });
      }
      const user = result.data;
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is the final piece of data that is stored in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await findUserById(id);
    if (result.error) {
      return done(result.error);
    }
    const user = result.data;
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const logInController = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

module.exports = { passport, logInController };
