const express = require("express");
const cors = require("cors");

const path = require("path");
const apiRouter = require("./routes/api");
const https = require("https");
const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT | 443;
const app = express();

app.use(express.static(path.join(__dirname, "public/build")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors({ exposedHeaders: ["trible-b"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

http.createServer(app).listen(80, () => console.log("listening on port 80"));

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => console.log(`Server started on port: ${PORT}`));
