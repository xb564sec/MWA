const express = require("express");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

let statuscode = 500;
let fileBuffer = "";

const app = express();

app.get("/", function (req, res) {
  fs.readFile(
    path.join(__dirname, "public", "index.html"),
    function (err, buffer) {
      if (err) {
        statusCode = 404;
        fileBuffer = "not found";
      } else {
        statuscode = 200;
        fileBuffer = buffer;
      }
      res.setHeader("Content-Type", "text/html").writeHead(200).end(fileBuffer);
    }
  );
});

app.get("/page1", function (req, res) {
  fs.readFile(
    path.join(__dirname, "public", "page1.html"),
    function (err, buffer) {
      if (err) {
        statusCode = 404;
        fileBuffer = "not found";
      } else {
        statuscode = 200;
        fileBuffer = buffer;
      }

      res.setHeader("Content-Type", "text/html").writeHead(200).end(fileBuffer);
    }
  );
});

app.get("/page2", function (req, res) {
  fs.readFile(
    path.join(__dirname, "public", "page2.html"),
    function (err, buffer) {
      if (err) {
        statusCode = 404;
        fileBuffer = "Unfortunately we couldn't serve the file come back later.";
      } else {
        statuscode = 200;
        fileBuffer = buffer;
      }

      res.setHeader("Content-Type", "text/html").writeHead(200).end(fileBuffer);
    }
  );
});

const server = app.listen(process.env.PORT || 3030, function () {
  console.log("server listen on port " + server.address().port);
});
