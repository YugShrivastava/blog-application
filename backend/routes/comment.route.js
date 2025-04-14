const express = require('express');
const { addComment, getAllComments } = require('../controllers/comment.controller');
const router = express.Router();

router.post('/add', addComment);
router.get('/', getAllComments);

module.exports = router;