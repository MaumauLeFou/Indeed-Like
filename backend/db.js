const { Pool } = require("pg");

const pool = new Pool({
  user: "mauriceledev",
  host: "localhost",
  database: "Indeed Like",
  password: "1234",
  port: 5432,
});

module.exports = pool;
