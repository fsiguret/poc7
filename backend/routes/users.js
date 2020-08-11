const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);
router.delete('/delete', auth , userCtrl.deleteUser);

module.exports = router;
