const Conversation = require('../models/conversation.model.js');
const Message  = require('../models/messages.model.js');
const mongoose = require('mongoose');
const { getReceiverSocketId, io } = require('../socket/socket.js');

const messageRoutes = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // Assuming req.user contains user details including _id

        console.log("Sender ID:", senderId);
        console.log("Receiver ID:", receiverId);

       
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        console.log("conversation model findOne is : ", conversation);

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message
        });


        conversation.messages.push(newMessage._id);              

        // below is running parallel

        await Promise.all([conversation.save(), newMessage.save()]); // at first conversation is creating then messages is 
        
        // socket io functionality 

        const receiverid = getReceiverSocketId(receiverId);

        if(receiverid)
        {
            io.to(receiverid).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage);

        console.log("Message sent successfully... Post route parameter id is /send/:id " + req.params.id);
    } catch (error) {
        console.log("Error while sending messages: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// reading messages from the senderid and receivers

const getMessages = async(req, res) => {

    try {

        const {id:userToChatId} = req.params; // here id is defined in the route which is going to rename into userToChatId
        const senderId = req.user._id; // getting from protected route

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate("messages");

        if(!conversation)
        {
            return res.status(200).json([]);
        }

        const mess = conversation.messages;

        res.status(200).json(mess);


        
    } catch (error) {

        console.log("Error while Reading Messages : ", error.message);
        
    }

}

module.exports = { messageRoutes, getMessages };
