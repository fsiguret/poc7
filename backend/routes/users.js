const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signUp);
router.post('/login');

module.exports = router;
