const express = require('express');
const passport = require('passport');
require('../middleware/passport')(passport);

const router = express.Router();

const verifyToken = passport.authenticate('jwt', { session: false });
const postController = require('../controllers/posts');
const { validate } = require('../middleware/validator');
const { storeSchema } = require('../middleware/validator').postSchema;

router.route('/')
  .get(postController.index)
  .post(validate(storeSchema), verifyToken, postController.store);

module.exports = router;
