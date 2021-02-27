const User = require('../models/user');

// test by using this format baseurl/api/exercise/log?userId=_idgoeshere&param1=p1&param2=p2
const log = (req, res, next) => {
    let { userId, from, to, limit } = req.query;

    User.findById(userId, (err, user) => {
        if (err) {
            console.error(`log error: ${err}`);
            return next(err);
        }
        if (!user) {
            console.error(`no user found with this id.`);
            return next(err);
        }

        let { _id, username, log } = user;
        let count = log.length;

        // Filter logs if any of the 'from', 'to', and 'limit' query params are given
        if (from || to) {
            log = log.filter(item => {
                let itemDate = item.date.getTime();
                if (from && to) return itemDate >= Date.parse(from) && itemDate <= Date.parse(to);
                else if (from && !to) return itemDate >= Date.parse(from);
                else if (to && !from) return itemDate >= Date.parse(to); 
            });
        }

        if (limit) {
            log = log.slice(0, limit || count);
            count = limit;
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
