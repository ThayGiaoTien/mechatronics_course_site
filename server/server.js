const express = require('express');
const cors= require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();
connectDB();

// Allow your frontend origin
app.use(cors({
    origin: ['https://tailieucodientu.com', 'www.tailieucodientu.com', 'http://localhost:3000'], // Add your frontend URL here
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type','Authorization']
  }));

app.use(express.json());


// Mount the routes
app.use('/api/courses', require('./routes/courses')); // make sure that you have routes/courses.js and model/Course.js
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/blogs', require('./routes/blogs')); // make sure that you have routes/blog.js and model/Blog.js
app.use('/api/categories', require('./routes/categories')); // make sure that you have routes/categories.js and model/Blog.js
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