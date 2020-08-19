const express = require('express');
const router = express.Router();
const articlesCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-configuration');

router.get('/', auth, articlesCtrl.getAllArticles);
router.get('/:id', auth, articlesCtrl.getOneArticle);
router.post('/', auth, multer, articlesCtrl.addArticle);
router.put('/:id/like', auth, articlesCtrl.likeOrDislike);
router.put('/:id', auth, multer, articlesCtrl.changeArticle);
router.delete('/:id', auth, articlesCtrl.deleteOneArticle);

module.exports = router;