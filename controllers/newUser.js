const User = require('../models/user');

const handleNewUser = async (req, res) => {
    let uname = req.body.username;

    // Check if the user is already in the database and act accordingly
    let user = await User.findOne({ username: uname });
    if (user) {
        console.log(`user exists: ${user.username}`);
        res.status(200).json({ username: user.username, _id: user._id });
    } else {
        user = new User({ username: uname });

        user.save((err, doc) => {
            if (err) return console.error(`save error: ${err}`);
            console.log(`Document inserted successfully, ${user.username}`);
            res.status(201).json({ username: user.username, _id: user._id });
        });
    }
};

module.exports = handleNewUser
