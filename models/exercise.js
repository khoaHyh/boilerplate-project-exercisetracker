const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    userId: Number
    date: { type: Date, default: Date.now },
    duration: Number,
    description: String
});

module.exports = mongoose.model('user', userSchema);
