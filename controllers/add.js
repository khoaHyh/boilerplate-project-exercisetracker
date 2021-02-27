const User = require('../models/user');

const add = (req, res, next) => {
    const { userId, date, duration, description } = req.body;

    if (!duration || !description) {
        console.log('duration or description not provided.');
        return res.send(404).json({ error: 'duration or description not provided.' });
    }

    // convert Date to required format and handle optional date input
    const convertDate = () => {
        let dateString = new Date().toDateString();
        if (date) dateString = new Date(date).toDateString();
        return dateString.split(' ')
            .slice(0, 4)
            .join(' ')
    }

    const log = {
        date: convertDate(),
        duration: parseInt(duration),
        description
    };

    User.findByIdAndUpdate(userId, { $push: { log } }, 
        { upsert: true, new: true }, (err, user) => {
            if (err) {
                console.error(`findByIdAndUpdate error: ${err}`); 
                return next(err);
            }
            let username = user.username;
            res.status(200).json({ 
                _id: userId, 
                username, 
                date: log.date,
                duration: parseInt(duration), 
                description 
            });
    });
}

module.exports = add
