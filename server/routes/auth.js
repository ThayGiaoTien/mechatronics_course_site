const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            name,
            email,
            password,
        });
        await user.save();
        
        // Create JWT Token
        const payload = {
            user: {
                id: user.id,
            },
        };
        const token= jwt.sign(payload, process.env.JWT_SECRET ||'secret',{
            expiresIn: 3600,
        });
        res.json({ token });
        // jwt.sign(payload, 'secret', {
        //     expiresIn: 3600,
        // }, (err, token) => {
        //     if (err) throw err;
        //     res.json({ token });
        // });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email }).select('+password');
        console.log("User found: ", user);
        console.log("User ID: ", user.id);    
        console.log("Password: ", user.password)
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }   
        const payload= {userID: user.id};
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
            expiresIn: 3600,
        });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});  
module.exports = router;
