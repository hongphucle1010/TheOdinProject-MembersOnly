const { query } = require("../BaseModel/BaseModel");

/**
 * List all messages
 * @returns {Promise<Array>} List of messages
 */
const listAllMessage = async () => {
  const sql = `SELECT messages.id, users.username, message, created_at 
    FROM messages 
      JOIN users on messages.user_id = users.id 
    ORDER BY created_at DESC`;
  const result = await query(sql);
  return result.rows;
};

/**
 * Insert a new message to the database
 * @param {number} userId User ID
 * @param {string} message Message content
 * @returns {Promise<Object>} Newly created message
 */
const insertMessage = async (userId, message) => {
  const sql =
    "INSERT INTO messages (user_id, message) VALUES ($1, $2) RETURNING *";
  const result = await query(sql, [userId, message]);
  return result.rows[0];
};

/**
 * Delete a message by ID
 * @param {number} id Message ID
 */
const deleteMessage = async (id) => {
  const sql = "DELETE FROM messages WHERE id = $1";
  const result = await query(sql, [id]);
};

module.exports = {
  listAllMessage,
  insertMessage,
  deleteMessage,
};
