const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    log: [{
        date: { type: Date, default: new Date() },
        duration: Number,
        description: String
    }]
});

module.exports = mongoose.model('user', userSchema);
