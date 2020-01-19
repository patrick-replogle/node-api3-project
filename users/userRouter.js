const express = require("express");
const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");
//custom middleware imports
const {
  validatePost,
  validateUserId,
  validateUser
} = require("../middleware/validate.js");

const router = express.Router();

//post a new user
router.post("/", validateUser(), (req, res) => {
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

//post a new post to for a specific user
router.post("/:id/posts", validatePost(), validateUserId(), (req, res) => {
  const newPost = {
    text: req.body.text,
    user_id: req.params.id
  };
  Posts.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "Post could not be added at this time"
      });
    });
});

//get all the users
router.get("/", (req, res) => {
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

//get user by id
router.get("/:id", validateUserId(), (req, res) => {
  // do your magic!
  res.json(req.user);
});

//get a specific user's posts
router.get("/:id/posts", validateUserId(), (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({
          message: "The specified user does not have any posts at this time"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "Can't retrieve user posts at this time"
      });
    });
});

//delete a user
router.delete("/:id", validateUserId(), (req, res) => {
  Users.remove(req.params.id).then(user => {
    res.status(200).json({ message: "This user has been destroyed" });
  });
});

//update a user
router.put("/:id", validateUser(), validateUserId(), (req, res) => {
  Users.update(req.params.id, req.body)
    .then(() => {
      Users.getById(req.params.id).then(user => res.json(user));
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "User could not be updated at this time"
      });
    });
});

module.exports = router;
