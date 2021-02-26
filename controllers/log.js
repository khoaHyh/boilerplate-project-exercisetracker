const User = require('../models/user');

const log = (req, res) => {
    const userId = req.query.userId;

    User.findById(userId, (err, user) => {
        if (err) return console.error(`log error: ${err}`);
        const { _id, username, log } = user;
        res.status(200).json({ 
            _id,
            username,
            log: log.map(exercise => { 
                const { duration, description } = exercise;
                let date = new Date(exercise.date).toDateString();
                return {
                    date,
                    duration,
                    description
                }
            })
        });
    });
}

module.exports = log
