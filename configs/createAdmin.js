const { createAdmin } = require("../models/AdminModel/AdminModel");

createAdmin("admin", "admin").then((res) => {
  console.log(res);
});
