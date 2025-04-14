const express = require('express');
const { addBlog, getBlogWithId, getAllBlogs } = require('../controllers/blog.controller');

const router = express.Router();

router.post('/add', addBlog);

router.get('/', getBlogWithId);

router.get('/all', getAllBlogs)

module.exports = router;