// const { createUser } = require("../models/UserModel/UserModel");

// createUser("hongphucle", "1010");

const {
  listAllMessage,
  insertMessage,
  deleteMessage,
} = require("../models/MessageModel/MessageModel");

listAllMessage().then((result) => {
  console.log(result);
});
