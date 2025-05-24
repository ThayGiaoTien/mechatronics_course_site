// routes/blogRoutes.js
const express = require('express');
const Blog =  require('../models/Blog.js');
const auth = require('../middleware/auth.js');
const admin = require('../middleware/admin.js');

const router = express.Router();

// Create a blog post (admin only)
router.post('/', auth, admin, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    blog.slug = blog.title.toLowerCase().replace(/\s+/g, '-');
    blog.author = req.user._id;
    const saved = await blog.save();
    if (req.body.isPublished) {
      saved.publishedAt = new Date();
      await saved.save();
    }
    console.log('Blog created:', saved);
    
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all published blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a blog post (admin only)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });    
    if (!updatedBlog) return res.status(404).json({ error: 'Course not found' });
    res.json(updatedBlog);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a blog post (admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;