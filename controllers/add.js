const User = require('../models/user');

const add = (req, res) => {
    const { userId, date, duration, description } = req.body;

    if (!duration || !description) {
        console.log('duration or description not provided.');
        return res.send(404).json({ error: 'duration or description not provided.' });
    }

    const log = {
        date: date === null || date === ''
            ? new Date().toDateString()
            : new Date(date).toDateString(),
        duration,
        description
    };

    User.findByIdAndUpdate(userId, { $push: { log } }, 
        { upsert: true, new: true }, (err, user) => {
            if (err) return console.error(`findByIdAndUpdate error: ${err}`); 
            let username = user.username;
            res.status(200).json({ 
                _id: userId, 
                username, 
                date: log.date, 
                duration, 
                description 
            });
    });
}

module.exports = add
