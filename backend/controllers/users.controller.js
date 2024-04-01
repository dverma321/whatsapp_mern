const Conversation = require('../models/conversation.model.js');
const Message  = require('../models/messages.model.js');
const User  = require('../models/user.model.js');
const mongoose = require('mongoose');


const usersToSideBar = async (req, res) => {

    try {

        const loginedUser = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loginedUser}}).select("-password -cpassword");

        console.log("Total Users : ",filteredUsers.length)

        res.status(200).json(filteredUsers);

        
    } catch (error) {

        console.log("Error while reading usersToSideBar");
        res.status(500).json(error.message);
        
    }

}

module.exports = usersToSideBar;