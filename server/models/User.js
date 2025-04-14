const mongoose = require('mongoose');
const bscrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    credit: {
        type: Number,
        default: 99999 // Virtual wallet, initial gift
        
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
    //resetPasswordToken: String,
    //resetPasswordExpire: Date,
}, {timestamps: true});

// Hash password before saving
UserSchema.pre('save', async function(next){
    const salt = await bscrypt.genSalt(10);
    this.password = await bscrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);