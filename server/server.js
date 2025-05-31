const express = require('express');
const cors= require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();
connectDB();

// Allow your frontend origin
app.use(cors({
    origin: ['https://mechatronics-course-site.vercel.app/'],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,            // if you need cookies/auth
  }));

app.use(express.json());
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://mechatronics-course-site.vercel.app/');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
}
);
// app.use(express.urlencoded({ extended: true })); // if you need to parse form data
// app.use(express.static('public')); // if you need to serve static files
// app.use('/uploads', express.static('uploads')); // if you need to serve uploaded files
// app.use('/uploads', express.static('uploads')); // if you need to serve uploaded files
// app.use('/static', express.static('public')); // if you need to serve static files from public folder

// Mount the routes
app.use('/api/courses', require('./routes/courses')); // make sure that you have routes/courses.js and model/Course.js
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/blogs', require('./routes/blogs')); // make sure that you have routes/blog.js and model/Blog.js

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, 
//     { useNewUrlParser: true, 
//     useUnifiedTopology: true }
//     ).then(() => {
//         console.log('MongoDB Connected');
//     }).catch(err => console.log(err));   
// congif/db.js do it for us

// Test route
app.get('/', (req, res) => {
    res.send('Backend is working');
}); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});