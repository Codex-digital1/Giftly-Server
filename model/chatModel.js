const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    senderUsername: String,
    receiverUsername: String,
    image: String, 
    message: String,
    profileImage: String,
    timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('chat-message', chatSchema)
module.exports = Chat
