const Users = require("../users/userDb");
const Posts = require("../posts/postDb");

function validateUserId(req, res, next) {
  Users.getById(req.params.id).then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({
        message: "invalid user id"
      });
    }
  });
}

function validateUser(req, res, next) {
  if (!req.body) {
    return res.status(400).json({
      message: "missing user data"
    });
  } else if (!req.body.name) {
    return res.status(400).json({
      message: "missing required name field"
    });
  }
  next();
}

function validatePost(req, res, next) {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      message: "missing post data"
    });
  } else if (!body.text) {
    return res.status(400).json({
      message: "missing required text field"
    });
  }
  next();
}

function validatePostId(req, res, next) {
  Posts.getById(req.params.id).then(post => {
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(400).json({
        message: "Invalid post id"
      });
    }
  });
}

module.exports = {
  validateUserId,
  validateUser,
  validatePost,
  validatePostId
};
