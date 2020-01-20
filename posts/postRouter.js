const express = require("express");
const Posts = require("./postDb.js");
const { validatePost } = require("../middleware/validate.js");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        succes: false,
        error: "Posts could not be retrieved at this time"
      });
    });
});

router.get("/:id", validatePostId(), (req, res) => {
  res.json(req.post);
});

router.delete("/:id", validatePostId(), (req, res) => {
  Posts.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "This post has been nuked" });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "Post could not be removed at this time"
      });
    });
});

router.put("/:id", validatePost(), validatePostId(), (req, res) => {
  Posts.update(req.params.id, req.body)
    .then(() => {
      // res.status(200).json(post);
      Posts.getById(req.params.id).then(post => res.status(200).json(post));
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "Post could not be updated at this time"
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  return (req, res, next) => {
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
  };
}

module.exports = router;
