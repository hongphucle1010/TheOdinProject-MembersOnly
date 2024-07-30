const express = require("express");
const router = express.Router();
const {
  RootController,
} = require("../../controllers/RootController/RootController");

router.get("/", RootController);

module.exports = router;
