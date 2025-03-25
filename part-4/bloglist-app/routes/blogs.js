const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

// Get all blogs
router.get('/', (req, res) => {
  Blog.find({})
    .then((blogs) => res.json(blogs))
    .catch((error) => res.status(500).json({ error: 'Error fetching blogs' }));
});

// Create a new blog
router.post('/', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(500).json({ error: 'Error saving the blog' }));
});

module.exports = router;
