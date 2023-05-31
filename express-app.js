const express = require("express");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/", function (req, res) {
  getPublicFile(path.join(__dirname, "public", "index.html"), req, res);

});

app.get("/page1", function (req, res) {
  getPublicFile(path.join(__dirname, "public", "page1.html"), req, res);
});

app.get("/page2", function (req, res) {
  getPublicFile(path.join(__dirname, "public", "page2.html"), req, res);
});

const server = app.listen(process.env.PORT || 3030, function () {
  console.log("server listen on port " + server.address().port);
});


const getPublicFile = (path) => {
  let response = {
    statuscode: 500,
    fileBuffer: ""
  }
  fs.readFile(
    path.join(path),
    (err, buffer) => {
      if (err) {
        response.statusCode = 404;
        response.fileBuffer = "Not found";
      } else {
        response.statuscode = 200;
        response.fileBuffer = buffer;
      }
      res.setHeader("Content-Type", "text/html").writeHead(response.statusCode).end(response.fileBuffer);
    }
  );
}