const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// @route GET /api/courses
// @desc  Get all courses
router.get('/', async (req, res) => {
    try{
        const courses = await Course.find();
        res.json(courses);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/courses -Create new course
router.post('/', async (req, res) => {
    const { title, description, price, thumbnail } = req.body;
    try{
        const newCourse = new Course({
            title,
            description,
            price,
            thumbnail,
        });
        const course = await newCourse.save();
        res.json(course);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router; 