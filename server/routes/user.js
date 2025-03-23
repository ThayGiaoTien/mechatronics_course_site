const express= require('express');
const router= express.Router();
const auth = require('../middleware/auth');

// GET /api/user/me - protected route
router.get('/me', auth, async (req, res) => {    
    res.json({msg: 'Yor are authorized', userId: req.user.id});
   
});

module.exports = router;