const express = require("express");
const { logger } = require("./middleware/logger.js");
const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use(logger);

module.exports = server;
