const express = require('express');
const passport = require('passport');
require('../middleware/passport')(passport);

const router = express.Router();

const verifyToken = passport.authenticate('jwt', { session: false });
const auth = passport.authenticate('local', { session: false });

const userController = require('../controllers/users');
const { validate } = require('../middleware/validator');
const { signInSchema, signUpSchema } = require('../middleware/validator').userSchema;

router.post('/signup', validate(signUpSchema), userController.signUp);
router.post('/signin', validate(signInSchema), auth, userController.signIn);
router.get('/account', verifyToken, userController.account);
router.get('/posts', verifyToken, userController.userPosts);

module.exports = router;
