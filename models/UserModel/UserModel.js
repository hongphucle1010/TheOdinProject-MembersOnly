const { query, ModelResponse } = require("../BaseModel/BaseModel");
const bcrypt = require("bcryptjs");

/**
 * Find a user by username
 * @param {string} username Username that you want to find
 * @returns {Promise<ModelResponse>} User data and error message
 */
const findUser = async (username) => {
  try {
    const res = await query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return new ModelResponse(res.rows[0], null);
  } catch (err) {
    console.error("Here is the error", err);
    return new ModelResponse(null, err);
  }
};

/**
 * Find a user by ID
 * @param {Number} id User ID that you want to find
 * @returns {Promise<ModelResponse>} User data and error message
 */
const findUserById = async (id) => {
  try {
    const res = await query("SELECT * FROM users WHERE id = $1", [id]);
    return new ModelResponse(
      res.rows[0],
      res.rows[0] ? null : "User not found"
    );
  } catch (err) {
    console.error(err);
    return new ModelResponse(null, err);
  }
};

/**
 * Create a new user
 * @param {string} username Username of the new user
 * @param {string} password Password of the new user
 * @returns {Promise<ModelResponse>} Newly created user data and error message
 */
const createUser = async (username, password) => {
  try {
    const user = await findUser(username);
    if (user.data) {
      return new ModelResponse(null, "User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    return new ModelResponse(res.rows[0], null);
  } catch (err) {
    console.error(err);
    return new ModelResponse(null, err);
  }
};

/**
 * Upgrade a user's role to 'member'
 * @param {Number} id User ID that you want to upgrade
 * @returns {Promise<ModelResponse>} Updated user data and error message
 */
const upgradeUser = async (id) => {
  try {
    const res = await query(
      "UPDATE users SET role = 'member' WHERE id = $1 RETURNING *",
      [id]
    );
    return new ModelResponse(res.rows[0], null);
  } catch (err) {
    console.error(err);
    return new ModelResponse(null, err);
  }
};

/**
 * Downgrade a user's role to 'basic'
 * @param {Number} id User ID that you want to downgrade
 * @returns {Promise<ModelResponse>} Updated user data and error message
 */
const downgradeUser = async (id) => {
  try {
    const res = await query(
      "UPDATE users SET role = 'basic' WHERE id = $1 RETURNING *",
      [id]
    );
    return new ModelResponse(res.rows[0], null);
  } catch (err) {
    console.error(err);
    return new ModelResponse(null, err);
  }
};

module.exports = {
  createUser,
  findUser,
  findUserById,
  upgradeUser,
  downgradeUser,
};
