const User = require('../models/user');

// test by using this format baseurl/api/exercise/log?userId=_idgoeshere&param1=p1&param2=p2
const log = (req, res, next) => {
    let { userId, from, to, limit } = req.query;

    User.findById(userId, (err, user) => {
        if (err) {
            console.error(`log error: ${err}`);
            return next(err);
        }

        let { _id, username, log } = user;
        const count = log.length;

        if (from) {
            log = log.filter(item => { return item.date.getTime() >= Date.parse(from) });
        }

        if (to) {
            log = log.filter(item => { return item.date.getTime() <= Date.parse(to) });
        }

        if (limit) {
            log = log.filter((item, i) => i < req.query.limit);
        }

        res.status(200).json({ 
            _id,
            username,
            count,
            log: log.map(exercise => { 
                const { duration, description } = exercise;
                // convert the date to an easier-to-read format
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
