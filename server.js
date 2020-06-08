const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");
const { logger } = require("./middleware/logger.js");

const server = express();

server.use(helmet());
server.use(logger);
server.use(express.json());
server.use(cors());

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

//custom error middleware
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "An internal error occured. Please try again later."
  });
});

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
