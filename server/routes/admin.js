const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Course = require('../models/Course');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');

// GET /api/admin/users - Get all users
router.get('/users', auth, admin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/admin/courses create new course
router.post('/courses', auth, admin, async (req, res) => {
    const {title, description, price, thumbnail} = req.body;
    try {
        const newCourse = new Course({
            title,
            description,
            price,
            thumbnail,
        });
        const course = await newCourse.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;