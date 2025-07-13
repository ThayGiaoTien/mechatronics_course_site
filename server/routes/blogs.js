// routes/blogRoutes.js
const express = require('express');
const Blog =  require('../models/Blog.js');
const auth = require('../middleware/auth.js');
const admin = require('../middleware/admin.js');

const router = express.Router();

// Create a blog post (admin only)
router.post('/', auth, admin, async (req, res) => {
  try{
    const blog = new Blog(req.body);
    blog.slug = blog.title.toLowerCase().replace(/\s+/g, '-');
    // check if slug already exists
    const existingBlog = await Blog.findOne({ slug: blog.slug });
    if (existingBlog) {
      return res.status(400).json({ error: 'Blog with this slug already exists'
      });
    }
    // blog.author = req.user._id;
    blog.populate('author', 'name'); // Assuming you want to populate author details
    const saved = await blog.save();

    if (req.body.isPublished) {

      saved.publishedAt = new Date();
      await saved.save();
    }
    console.log('Blog created successfully:', saved);
    res.status(201).json({ message: 'Blog created successfully'});
  }
  catch (err) {
    console.error('Error creating blog:', err);
    return res.status(500).json({ error: 'Failed to create blog' });
  }
});


router.get("/", async (req, res) => {
  try {
    //const { sort = "newest", page = "1", limit = "10" } = req.query;
    const pageNum = parseInt(req.query.page, 10);
    const limitNum = parseInt(req.query.limit, 10);

    // Build sort object
    let sortObj = {};
    if (req.query.sort === "newest") {
      sortObj = { publishedAt: -1 };
    } else if (sort === "oldest") {
      sortObj = { publishedAt: 1 };
    } else if (sort === "views") {
      sortObj = { views: -1 };
    }

    // Skip and limit
    const skip = (pageNum - 1) * limitNum;

    // Filter by categories if provided
    let filter = { isPublished: true };
    if (req.query.categories) {
      // Support comma-separated categories
      const categories = req.query.categories.split(',').map(cat => cat.trim());
      filter.categories = { $in: categories };
    }

    const blogs = await Blog.find(filter)
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

// Get related blogs by category
// routes/blogs.js or wherever your blog routes are
router.get('/related', async (req, res) => {
  const { category, excludeId } = req.query;
  console.log('Fetching related blogs for category:', category, 'excluding ID:', excludeId);  
  if (!category || !excludeId) {
    return res.status(400).json({ message: 'Category and excludeId are required' });
  }
  try {
    const related = await Blog.find({
      categories: category,
      _id: { $ne: excludeId },
      isPublished: true,
    })
      .sort({ createdAt: -1 })
      .select('title slug') // Only return title and slug
      
    res.json(related);
    console.log('Related blogs fetched successfully:', related);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching related blogs' });
  }
});

// Get blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
    // Increment views count
    blog.views += 1;
    await blog.save();
    
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