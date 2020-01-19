const user = require("../users/userDb");

function validateUserId(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    user.getById(req.params.id).then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({
          message: "invalid user id"
        });
      }
    });
  };
}

function validateUser(req, res, next) {
  // do your magic!
  return (req, res, next) => {
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
  };
}

function validatePost(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "missing post data"
      });
    } else if (!req.body.text) {
      return res.status(400).json({
        message: "missing required text field"
      });
    }
    next();
  };
}

module.exports = {
  validateUserId,
  validateUser,
  validatePost
};
