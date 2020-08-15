const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');
const auth = require('../middleware/auth');
const validate = require('../middleware/joi_configuration_signup');

router.post('/signup', validate, userCtrl.signUp);
router.post('/login', validate, userCtrl.login);
router.delete('/delete', auth , userCtrl.deleteUser);

module.exports = router;
