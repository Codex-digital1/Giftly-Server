// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema({
//   userInfo: {
//     type: String,
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Message = mongoose.model("Message", messageSchema);

// module.exports = Message;

const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    senderUsername: String,
    receiverUsername: String,
    message: String,
    profileImage: String,
    timestamp: {type: Date, default: Date.now}
})

const Chat = mongoose.model('chat-message', chatSchema)
module.exports = Chat
