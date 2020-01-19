const express = require("express");
const helmet = require("helmet");
const userRouter = require("./users/userRouter.js");
const { logger } = require("./middleware/logger.js");

const server = express();

server.use(helmet());
server.use(logger);
server.use(express.json());

server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
