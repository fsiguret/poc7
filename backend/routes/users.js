const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');
const auth = require('../middleware/auth');
const validateSignup = require('../middleware/joi_configuration_signup');
const validateLogin = require('../middleware/joi_configuration_login');
const limiter = require('../middleware/rate-limit');

router.post('/signup', validateSignup, userCtrl.signUp);
router.post('/login',limiter , validateLogin, userCtrl.login);
router.delete('/delete', auth , userCtrl.deleteUser);

module.exports = router;
