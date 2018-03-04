const express = require('express');
const passport = require('passport');
require('../middleware/passport')(passport);

const router = express.Router();

const verifyToken = passport.authenticate('jwt', { session: false });
const postController = require('../controllers/posts');

router.route('/')
  .get(postController.getPosts)
  .post(verifyToken, postController.addPost);

module.exports = router;
