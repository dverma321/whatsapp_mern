const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"  // Reference to the User model or whichever model represents participants
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "message",  // Reference to the Message model or whichever model represents messages
            default: []
        }
    ]
}, { timestamps: true });

const Conversation = mongoose.model('conversation', conversationSchema);

module.exports = Conversation;
