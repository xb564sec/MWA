const http = require("http");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

let statuscode = 500;
let fileBuffer = "";

const routing = function (req, res) {
  let url = req.url;
  switch (url) {
    case "/":
      serveIndex(req, res);
      break;
    case "/page1":
      servePageOne(req, res);
      break;
    case "/page2":
      servePageTwo(req, res);
      break;
  }
}

const serveIndex = function (req, res) {
  fs.readFile(
    path.join(__dirname, "public", "index.html"),
    function (err, buffer) {
      if (err) {
        statusCode = 404;
        fileBuffer = "Looks like you're lost";
      } else {
        statuscode = 200;
        fileBuffer = buffer;
      }

      res.setHeader("Content-Type", "text/html").writeHead(200).end(fileBuffer);
    }
  );
};

const servePageOne = function (req, res) {
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
};

const servePageTwo = function (req, res) {
  fs.readFile(
    path.join(__dirname, "public", "page2.html"),
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
};

const httpServer = http.createServer(routing);

httpServer.listen(process.env.PORT || 3030, function () {
  console.log("server listen on port " + httpServer.address().port);
});
