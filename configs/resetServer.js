require("dotenv").config();
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main().catch(console.error);
