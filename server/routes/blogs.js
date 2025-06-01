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
// router.get('/', async (req, res) => {
//   try {
//     const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1 });
//     res.json(blogs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// GET /api/blogs?sort=newest|oldest|views&page=1&limit=10
router.get("/", async (req, res) => {
  try {
    const { sort = "newest", page = "1", limit = "10" } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Build sort object
    let sortObj = {};
    if (sort === "newest") {
      sortObj = { publishedAt: -1 };
    } else if (sort === "oldest") {
      sortObj = { publishedAt: 1 };
    } else if (sort === "views") {
      sortObj = { views: -1 };
    }

    // Skip and limit
    const skip = (pageNum - 1) * limitNum;

    const blogs = await Blog.find({ isPublished: true })
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .lean();

    res.json(blogs);
  } catch (err) {
    console.error("Error in GET /api/blogs:", err);
    res.status(500).json({ message: "Server error" });
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