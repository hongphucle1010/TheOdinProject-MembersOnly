// Import all the required modules
const express = require("express");
const app = express();
const path = require("path");

// Configurations
require("dotenv").config();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Import the router
const rootRouter = require("./routes/RootRouter/RootRouter");
const logInRouter = require("./routes/LogInRouter/LogInRouter");
const signUpRouter = require("./routes/SignUpRouter/SignUpRouter");
const notFoundRouter = require("./routes/404/404");

// Router Middleware
app.use("/login", logInRouter);
app.use("/signup", signUpRouter);
app.use("/", rootRouter);
app.use("*", notFoundRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
