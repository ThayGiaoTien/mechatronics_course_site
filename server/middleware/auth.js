const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('Authorization');
    console.log("Token: ", token);
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded; // contains user id
        next();  // use to pass control to the next middleware function
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};