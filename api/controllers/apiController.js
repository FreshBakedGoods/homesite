const httpResp = require("../helpers/httpResp");

module.exports.apiController_read = (req, res) => {
  res.json(
    httpResp("success", req, { api_version: 1 })
  );
};
