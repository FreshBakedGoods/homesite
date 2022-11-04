const express = require("express");
const app = express();
const http = require("http");
const https = require("https");

const PORT = process.env.PORT || 5000;

app.route("/").get((req, res) => {
  res.json({
    status: "success",
    route: req.route.path,
    method: req.route.stack[0].method,
  });
});

http.createServer(app).listen(PORT, () => {
  console.log(`API listening on port: ${PORT}`);
});
