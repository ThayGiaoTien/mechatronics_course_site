const mongoose = require('mongoose');



const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    videos: [{
        title: String, 
        description: String,
        youtubeId: String,
        isFree: Boolean,
    }],
    purchasedCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true});


const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;