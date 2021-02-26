const User = require('../models/user');

const findAllUsers = async (req, res) => {
    // find all documents
    let arrayOfUsers = await User.find({})
        .select('_id username');
    try {
        res.status(200).json(arrayOfUsers);
    } catch(err) {
        return console.error(`findAllUsers error: ${err}`);
    }
}

module.exports = findAllUsers
