const mongoose = require('mongoose');
const URI = "mongodb+srv://thelaststanding97:5dpvg3fffcXcR78f@webdb.wxn35ni.mongodb.net/?retryWrites=true&w=majority&appName=WebDB";


const connectDB = async() => {
    try {
        await mongoose.connect(URI  );
        console.log('MongoDB connected');
    } catch (err){
        console.error('MongoDB connection error');
        process.exit(1);
    }
};
module.exports = connectDB;