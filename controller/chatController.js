const Chat = require("../model/chatModel");

// Route to get chats between two users (sender and receiver)
exports.getAllMessage = async (req, res) => {
  const { sender, receiver } = req.query; // Get sender and receiver from query params
  console.log("sender",sender)
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
