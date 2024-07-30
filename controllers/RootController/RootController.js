const { listAllMessage } = require("../../models/MessageModel/MessageModel");

const RootController = async (req, res) => {
  const messages = await listAllMessage();
  res.render("index", {
    title: "Home",
    message: req.user
      ? `Welcome back, ${req.user.username}!`
      : "Welcome to the ClubHouse! Sign up or log in to access the ClubHouse page.",
    user: req.user,
    chatMessages: messages,
  });
};

module.exports = { RootController };
