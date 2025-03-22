const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;