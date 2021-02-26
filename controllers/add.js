const User = require('../models/user');

const add = async (req, res) => {
    const { userId, date, duration, description } = req.body;
    // date ? date : new Date(`${dateYear}-${dateMonth}-${dateDay}`);
    let optionsDay = { weekday: 'long'};
    let optionsMonth = { month: 'long'};
    const year = new Date().getFullYear();
    const month = new Intl.DateTimeFormat('en-US', optionsMonth).format(new Date());
    const day = new Intl.DateTimeFormat('en-US', optionsDay).format(new Date());
    const numberDay = new Date().getDate();
    console.log(`${day} ${month} ${numberDay} ${year}`);

    const log = {
        date,
        duration,
        description
    };

    User.findByIdAndUpdate(userId, { $push: { log } }, { new: true }, (err, user) => {
        if (err) return console.error(`findByIdAndUpdate error: ${err}`); 
        if (!user) res.status(404).json({ error: 'id not found' });   
        let username = user.username;
        console.log(userId, username, date, duration, description);
        res.status(204).json({ userId, username, date, duration, description });
    });
}

module.exports = add
