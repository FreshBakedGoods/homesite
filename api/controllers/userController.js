const httpResp = require("../helpers/httpResp");
const bcrypt = require("bcrypt");
const { query } = require("../database");
const saltRounds = process.env.SALTROUNDS || 12;

module.exports.userController_create = async (req, res) => {
  const { username, displayName, password, email } = req.body;
  try {
    const start = Date.now();
    const hash = await bcrypt.hash(password, saltRounds);
    const end = Date.now();
    console.log(`Last bcrypt hash took ${end - start}ms.`);
    const text =
      "INSERT INTO users(username, display_name, password, email) VALUES ($1, $2, $3, $4)";
    const values = [username, displayName, hash, email];
    await query(text, values);
    res.json(
      httpResp("success", req, {
        message: "User created.",
      })
    );
  } catch (e) {
    let errMessage = "Failed to create user.";
    if (e.severity === "ERROR" && e.code === "23505") {
      const key = e.detail.split(/[()]/, 2);
      errMessage = `${key[1]} is already in use.`;
    }
    res.json(
      httpResp("failure", req, {
        error_message: errMessage,
      })
    );
  }
};

module.exports.userController_read = async (req, res) => {
  try {
    const text =
      "SELECT username, display_name, email, email_confirmed FROM users WHERE username = $1";
    const values = [res.locals.username];
    const { rows } = await query(text, values);
    if (rows.length !== 1) throw "Username not found.";
    res.json(httpResp(1, req, { user: rows[0] }));
  } catch (e) {
    console.error(e);
    res.json(httpResp(0, req, { message: e }));
  }
};

module.exports.userController_update = (req, res) => {
  res.json(httpResp("success", req, { message: "You did it" }));
};

module.exports.userController_delete = (req, res) => {
  res.json(httpResp("success", req, { message: "You did it" }));
};
