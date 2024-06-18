const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type:String,
        requaired: true,
        unique:true,
    }
});

module.exports = mongoose.model('User', userSchema, 'users');
