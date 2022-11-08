const { v4: uuidv4 } = require("uuid");
const { query } = require("../database");
const CryptoJS = require("crypto-js");
const { json, text } = require("express");
const httpResp = require("../helpers/httpResp");

const SECRET = process.env.SECRET || "SECRETPHRASE";
const VALIDPERIOD = 12096e5;

module.exports.createAuthToken = async (req, res) => {
  const { username } = req.body;
  try {
    const token = uuidv4();
    const expires = new Date(Date.now() + VALIDPERIOD).getTime();
    if (!username) throw "Username not found.";
    const text =
      "INSERT INTO user_tokens(token, user_id, expires) VALUES ($1, (SELECT _id FROM users WHERE username = $2), $3) returning user_id";
    const values = [token, username, expires];
    const { rows, rowCount } = await query(text, values);
    if (rowCount < 1) throw "Fauled to update user auth token.";
    _setToken(res, { token, username, _id: rows[0].user_id, expires });
    res.json(httpResp(1, req, { login_successful: true }));
  } catch (e) {
    console.error(e);
    res.json(httpResp(0, req, { login_successful: false }));
  }
};

function _setToken(res, { token, username, _id, expires }) {
  const plainText = JSON.stringify({ token, username, _id, expires });
  const ciphertext = CryptoJS.AES.encrypt(plainText, SECRET);
  res.set("trible-b", ciphertext);
}

module.exports.authCheck = async (req, res, next) => {
  try {
    const { expires, username, _id } = await _validateToken(req, res);
    res.locals = { ...res.locals, _id, username };
    if (expires - Date.now() < VALIDPERIOD / 2) await _updateToken(req, res);
    next();
  } catch (e) {
    console.log(e);
    res.json(httpResp(0, req, { error: e }));
  }
};

function _validateToken(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      const decrypted = _getToken(req);
      const text =
        "SELECT ut.expires, ut.token, u.username, u._id \
                    FROM user_tokens AS ut \
                    JOIN users AS u ON u._id=ut.user_id \
                    WHERE ut.token=$1";
      const values = [decrypted.token];
      const { rowCount, rows } = await query(text, values);
      if (rowCount === 0) throw "Token not valid.";
      if (rows[0].expires - Date.now() <= 0) throw "Token has expired";
      resolve(rows[0]);
    } catch (e) {
      reject(e);
    }
  });
}

function _getToken(req) {
  if (req.get("trible-b") === "null") throw "Auth token not found.";
  const encrypted = req.get("trible-b");
  return JSON.parse(
    CryptoJS.AES.decrypt(encrypted, SECRET).toString(CryptoJS.enc.Utf8)
  );
}

function _updateToken(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = _getToken(req);
      const expires = new Date(Date.now() + VALIDPERIOD).getTime();
      const text =
        "UPDATE user_tokens SET expires = $1 WHERE user_id = (SELECT _id FROM users WHERE username = $2) AND token = $3 returning *";
      const values = [expires, token.username, token.token];
      const { rowCount, rows } = await query(text, values);
      if (rowCount === 0) throw "Failed to update token expiration.";
      _setToken(res, { ...token, expires });
      resolve(true);
    } catch (e) {
      reject(false);
    }
  });
}
