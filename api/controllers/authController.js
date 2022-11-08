const httpResp = require("../helpers/httpResp");
const bcrypt = require("bcrypt");
const { query } = require("../database");

module.exports.authController_login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await _getUser(username);
    const isValidPassword = await _checkPassword(password, user.password);
    if (!isValidPassword) throw "Failed to login";
    next();
  } catch (e) {
    res.json(
      httpResp("failure", req, {
        login_successful: false,
      })
    );
  }
};

module.exports.authController_logout = async (req, res) => {
  try {
    res.json(httpResp(1, req, { isLoggedOut: true }));
  } catch (e) {
    res.json(httpResp(0, req, { isLoggedOut: false }));
  }
};

function _getUser(username) {
  return new Promise(async (resolve, reject) => {
    try {
      const sqlText = "SELECT * FROM users WHERE username=$1";
      const values = [username];
      const user = await query(sqlText, values);
      if (user.rowCount !== 1) throw new Error("User not found");
      resolve(user.rows[0]);
    } catch (e) {
      reject(e);
    }
  });
}

function _checkPassword(password, hash) {
  return new Promise(async (resolve, reject) => {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      resolve(isMatch);
    } catch (e) {
      reject(e);
    }
  });
}
