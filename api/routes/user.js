const express = require("express");
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const userController = require("../controllers/users");

router.post("/register", userController.userRegister);
router.post("/log-in", userController.userLogin);
router.get('/account', verifyToken, userController.userAccount);

module.exports = router;