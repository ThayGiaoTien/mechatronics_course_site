const mongoose = require('mongoose');
//const bscrypt= require('bcryptjs');
const User = require('../models/User');
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
connectDB();

async function createAdmin() {
    try{
        const existingAdmin = await User.findOne({email: "teacherforward_admin@gmail.com"});
        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }
        //const salt= await bcrypt.genSalt(10);
       //const hashedPassword = await bscrypt.hash("admin123", salt);
        const admin = new User({
            name: "Admin",
            email: "teacherforward_admin@gmail.com",
            password: "admin123",
            isAdmin: true, 
        });
        await admin.save();
        console.log("Admin created");
    }
    catch(err) {
        console.error(err.message);
    } finally {
        mongoose.disconnect();
    }
};

createAdmin();