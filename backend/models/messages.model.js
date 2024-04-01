const mongoose  = require('mongoose')

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // message Model from the mongodb database
        require: true
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // message Model from the mongodb database
        require: true
    },

    message: {
        type: String,
        required: true
    }
}, 
{
    // created At, updated At
    timestamps: true
}
)

const Message = mongoose.model('message', messageSchema );

module.exports = Message;