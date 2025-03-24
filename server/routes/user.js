const express= require('express');
const router= express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// GET /api/user/me - protected route
router.get('/me', auth, async (req, res) => {    
    try{
        const user = await User.findById(req.user.userId).select('-password');
        console.log("User found: ", user);
        if (!user) {
            return res.status(404).json({msg: 'User not found'});
        }
        res.json({msg: 'Yor are authorized', userId: req.user.userId, 
            userName: user.name,
            userEmail: user.email,
            userCredit: user.credit
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;