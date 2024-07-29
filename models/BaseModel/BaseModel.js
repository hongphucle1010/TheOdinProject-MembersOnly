const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

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

module.exports = {
  pool,
  query,
};
