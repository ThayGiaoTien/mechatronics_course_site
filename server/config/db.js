const mongoose = require('mongoose');
const URI = "mongodb+srv://thelaststanding97:wQrWM8rBjxF4utSl@webdb.wxn35ni.mongodb.net/?retryWrites=true&w=majority&appName=WebDB";


const connectDB = async() => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err){
        console.error('MongoDB connection error');
        process.exit(1);
    }
};
module.exports = connectDB;