const express = require('express');
const passport = require('passport');
require('../middleware/passport')(passport);

const router = express.Router();

const verifyToken = passport.authenticate('jwt', { session: false });
const auth = passport.authenticate('local', { session: false });

const userController = require('../controllers/users');

router.post('/register', userController.userRegister);
router.post('/log-in', auth, userController.userLogin);
router.get('/account', verifyToken, userController.userAccount);

module.exports = router;
