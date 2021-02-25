const User = require('../models/user');

const findAllUsers = async (req, res) => {
    // find all documents
    let arrayOfUsers = await User.find({}); 
    try {
        res.status(200).json({ list: arrayOfUsers });
    } catch(err) {
        return console.error(`${err}`);
    }
}

module.exports = findAllUsers
