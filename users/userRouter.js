const express = require("express");
const Users = require("./userDb.js");
//custom middleware imports
const {
  validatePost,
  validateUserId,
  validateUser
} = require("../middleware/validate.js");

const router = express.Router();

router.post("/", validatePost(), (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "User could not be added at this time"
      });
    });
});

router.post("/:id/posts", validateUser(), validateUserId(), (req, res) => {
  // do your magic!
  //should this be in the postRouter?
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The users information could not be retrieved"
      });
    });
});

router.get("/:id", validateUserId(), (req, res) => {
  // do your magic!
  res.json(req.user);
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", validateUserId(), (req, res) => {
  // do your magic!
  Users.remove(req.params.id).then(user => {
    res.status(200).json({ message: "This user has been destroyed" });
  });
});

router.put("/:id", validateUser(), validateUserId(), (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "User could not be updated at this time"
      });
    });
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
