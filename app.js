// Import all the required modules
const express = require("express");
const app = express();
const path = require("path");
const flash = require("connect-flash");
const { passport } = require("./controllers/UserControllers/LogInController");
const session = require("express-session");

// Configurations
require("dotenv").config();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

// Import the router
const rootRouter = require("./routes/RootRouter/RootRouter");
const logInRouter = require("./routes/LogInRouter/LogInRouter");
const signUpRouter = require("./routes/SignUpRouter/SignUpRouter");
const notFoundRouter = require("./routes/404/404");
const logOutRouter = require("./routes/LogOutRouter/LogOutRouter");

// Router Middleware
app.use("/login", logInRouter);
app.use("/signup", signUpRouter);
app.use("/logout", logOutRouter);
app.use("/", rootRouter);
app.use("*", notFoundRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
