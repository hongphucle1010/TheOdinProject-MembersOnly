const { query } = require("../BaseModel/BaseModel");
const bcrypt = require("bcryptjs");

const findUser = async (username) => {
  try {
    const res = await query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return {
      data: res.rows[0],
      error: null,
    };
  } catch (err) {
    console.error("Here is the error", err);
    return {
      data: null,
      error: err,
    };
  }
};

const findUserById = async (id) => {
  try {
    const res = await query("SELECT * FROM users WHERE id = $1", [id]);
    return {
      data: res.rows[0],
      error: res.rows[0] ? null : "User not found",
    };
  } catch (err) {
    console.error(err);
    return {
      data: null,
      error: err,
    };
  }
};

const createUser = async (username, password) => {
  try {
    const user = await findUser(username);
    if (user.data) {
      return {
        data: null,
        error: "User already exists",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const res = await query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    return {
      data: res.rows[0],
      error: null,
    };
  } catch (err) {
    console.error(err);
    return {
      data: null,
      error: err,
    };
  }
};

const upgradeUser = async (id) => {
  try {
    const res = await query(
      "UPDATE users SET role = 'member' WHERE id = $1 RETURNING *",
      [id]
    );
    return {
      data: res.rows[0],
      error: null,
    };
  } catch (err) {
    console.error(err);
    return {
      data: null,
      error: err,
    };
  }
};

const downgradeUser = async (id) => {
  try {
    const res = await query(
      "UPDATE users SET role = 'basic' WHERE id = $1 RETURNING *",
      [id]
    );
    return {
      data: res.rows[0],
      error: null,
    };
  } catch (err) {
    console.error(err);
    return {
      data: null,
      error: err,
    };
  }
};

module.exports = {
  createUser,
  findUser,
  findUserById,
  upgradeUser,
  downgradeUser,
};
