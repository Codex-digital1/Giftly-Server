const Message = require("../model/chatModel");

// Fetch all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }); // Sorted by timestamp
    res.json(messages);
  } catch (err) {
    res.status(500).send("Error fetching messages");
  }
};

// Save new message
exports.createMessage = async (req, res) => {
  const { userInfo, message, timestamp } = req.body;

  try {
    const newMessage = new Message({
      userInfo,
      message,
      timestamp, // Ensure timestamp is used if provided
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).send("Error saving message");
  }
};
