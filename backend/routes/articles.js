const express = require('express');
const router = express.Router();
const articlesCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');

router.get('/', articlesCtrl.getAllArticles);
router.get('/:id', articlesCtrl.getOneArticle);
router.post('/', articlesCtrl.addArticle);
router.put('/:id/like', articlesCtrl.likeOrDislike);
router.put('/:id', articlesCtrl.changeArticle);
router.delete('/:id', articlesCtrl.deleteOneArticle);

module.exports = router;
