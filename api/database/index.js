const { Pool } = require("pg");

const pool = new Pool({
  user: "pjamieson-ca-user",
  host: "192.168.0.150",
  database: "pjamieson-ca",
  password: "password",
  port: 5432,
});

module.exports.query = (text, values) => pool.query(text, values);
