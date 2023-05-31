const http = require("http");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

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
  getPublicFile(path.join(__dirname, "public", "index.html"), req, res);
};

const servePageOne = function (req, res) {
  getPublicFile(path.join(__dirname, "public", "page1.html"), req, res);

};

const servePageTwo = function (req, res) {
  getPublicFile(path.join(__dirname, "public", "page2.html"), req, res);
};

const httpServer = http.createServer(routing);

httpServer.listen(process.env.HTTP_PORT || 3030, function () {
  console.log("server listen on port " + httpServer.address().port);
});


const getPublicFile = (path, req, res) => {
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