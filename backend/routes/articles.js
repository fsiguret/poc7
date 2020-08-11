const express = require('express');
const router = express.Router();
const articlesCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');

router.get('/', articlesCtrl.getAllArticles);
router.get('/:id', articlesCtrl.getOneArticle);
router.post('/', articlesCtrl.addArticle);
router.post('/:id/like');
router.put('/:id');
router.delete('/:id');

module.exports = router;
