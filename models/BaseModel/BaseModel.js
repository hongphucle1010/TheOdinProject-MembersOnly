const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/**
 * 
 * @param {string} text Query string
 * @param {Array} params Array of parameters
 * @returns {Promise<QueryResult<any>> } Query result
 */
const query = async (text, params) => {
  try {
    const client = await pool.connect();
    const res = await client.query(text, params);
    client.release();
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

class ModelResponse {
  /**
   * @param {any} data
   * @param {String | Object } error
   */
  constructor(data, error) {
    this.data = data;
    this.error = error;
  }
}

module.exports = {
  pool,
  query,
  ModelResponse,
};
