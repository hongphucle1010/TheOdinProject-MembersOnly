const { query, ModelResponse } = require("../BaseModel/BaseModel");
const bcrypt = require("bcryptjs");

const { findUser } = require("../UserModel/UserModel");

const createAdmin = async (username, password) => {
  try {
    const user = await findUser(username);
    if (user.data) {
      return new ModelResponse(null, "User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, 'admin') RETURNING *",
      [username, hashedPassword]
    );
    return new ModelResponse(res.rows[0], null);
  } catch (err) {
    console.error(err);
    return new ModelResponse(null, err);
  }
};

module.exports = { createAdmin };
