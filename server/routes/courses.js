const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

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

// GET a single detail course by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching course with ID: ${id}`); // Added logging
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Invalid course ID'); // Added logging
        return res.status(404).json({ msg: 'Invalid course ID' });
    }
    try {
        const course = await Course.findById(id);
        if (!course) {
            console.log('Course not found'); // Added logging
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE /api/courses/:id - Delete a course
router.delete('/:id', auth, admin, async (req, res) => {
    try{
        await Course.findByIdAndDelete(req.params.id);
        res.json({msg: 'Course deleted'});
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

module.exports = router; 