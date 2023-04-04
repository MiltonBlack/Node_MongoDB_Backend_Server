const express = require("express");
const {Register, Login} = require('../controllers/authController')
const router = express.Router();

router.route('/').post(Register);

router.route('/').post(Login);

module.exports = router;