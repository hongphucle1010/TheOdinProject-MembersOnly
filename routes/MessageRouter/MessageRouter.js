const express = require("express");
const router = express.Router();
const {
  insertMessage,  
  deleteMessage,
} = require("../../models/MessageModel/MessageModel");

router.post("/delete/:id", (req, res) => {
  const { user } = req;
  if (!user) {
    res.redirect("/login");
    return;
  }
  if (user.role !== "admin") {
    res.status(403).send("Forbidden");
    return;
  }
  const { id } = req.params;
  deleteMessage(id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

router.post("/", (req, res) => {
  const { user } = req;
  if (!user) {
    res.redirect("/login");
    return;
  }
  const { message } = req.body;
  console.log(user);
  console.log(message);
  insertMessage(user.id, message)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
