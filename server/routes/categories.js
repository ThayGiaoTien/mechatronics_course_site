const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
    try {
        // Fetch all unique categories from the blogs
        const categories = await Blog.distinct('categories');
        
        res.status(200).json(categories);
        console.log("Categories fetched successfully:", categories);
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;