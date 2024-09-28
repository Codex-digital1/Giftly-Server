const Chat = require("../model/chatModel");

// Fetch all messages
// exports.getMessages = async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ timestamp: 1 }); // Sorted by timestamp
//     res.json(messages);
//   } catch (err) {
//     res.status(500).send("Error fetching messages");
//   }
// };

// // Save new message
// exports.createMessage = async (req, res) => {
//   const { userInfo, message, timestamp } = req.body;

//   try {
//     const newMessage = new Message({
//       userInfo,
//       message,
//       timestamp, // Ensure timestamp is used if provided
//     });
//     await newMessage.save();
//     res.status(201).json(newMessage);
//   } catch (err) {
//     res.status(500).send("Error saving message");
//   }
// };

// Route to get chats between two users (sender and receiver)
exports.getAllMessage = async (req, res) => {
  const { sender, receiver } = req.query; // Get sender and receiver from query params
  console.log(sender)
  try {
    const chats = await Chat.find({
      $or: [
        { senderUsername: sender, receiverUsername: receiver },
        { senderUsername: receiver, receiverUsername: sender }
      ]
    }).sort({ createdAt: 1 }); // Sort by creation date

    res.status(200).json(chats); // Return chat data
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
