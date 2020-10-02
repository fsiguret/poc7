const express = require('express');
const router = express.Router();
const articlesCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-configuration');
const rateLimiteCommentary = require('../middleware/rateLimitCommentary');

router.get('/', auth, articlesCtrl.getAllArticles);
router.get('/:id', auth, articlesCtrl.getOneArticle);
router.get('/:id/comment', auth, articlesCtrl.getCommentByArticle);
router.get('/comment/:id', auth, articlesCtrl.getOneComment);
router.post('/', multer, auth, articlesCtrl.addArticle);
router.post('/:id/comment',auth, rateLimiteCommentary, articlesCtrl.commentArticle);
router.put('/:id/like', auth, articlesCtrl.likeOrDislike);
router.put('/:id',  multer, auth, articlesCtrl.changeArticle);
router.put('/comment/:id', auth, articlesCtrl.editCommentary);
router.delete('/:id', auth, articlesCtrl.deleteOneArticle);
router.delete('/:id/delcom', auth, articlesCtrl.deleteComment);

module.exports = router;
