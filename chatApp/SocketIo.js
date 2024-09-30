const { Server } = require('socket.io');
const Chat = require('../model/chatModel');

const SocketIo = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    // Load previous messages for the room
    const loadMessages = async (socket, sender, receiver) => {
        try {
            const messages = await Chat.find({
                $or: [
                    { senderUsername: sender, receiverUsername: receiver },
                    { senderUsername: receiver, receiverUsername: sender }
                ]
            }).sort({ timestamp: 1 }).exec();

            // Emit the chat messages to the client
            socket.emit('chat', messages);
        } catch (err) {
            console.log(err);
        }
    }

    io.on("connection", (socket) => {
        console.log("connected");

        // Join room and load previous chat messages
        socket.on('joinRoom', ({ sender, receiver }) => {
            const room = [sender, receiver].sort().join('-'); // Room ID based on sender and receiver
            socket.join(room); // Join the room
            loadMessages(socket, sender, receiver); // Load messages for the room
        });

        // Handle new messages
        socket.on('newMessage', async (msg) => {
            console.log("message is coming", msg.image);  // Check if senderUsername and receiverUsername are correctly logged
        
            const room = [msg.senderUsername, msg.receiverUsername].sort().join('-');  // Use same room ID
            try {
                const newMessage = new Chat({
                    senderUsername: msg.senderUsername,   // Make sure to use senderUsername field
                    receiverUsername: msg.receiverUsername, // Make sure to use receiverUsername field
                    image: msg.image, 
                    message: msg.message,
                    profileImage: msg.profileImage,
                });
                await newMessage.save();
                io.to(room).emit('message', msg);  // Send message only to the room
        
                // Send notification to the receiver
                socket.broadcast.to(room).emit('notification', {
                    message: `New message from ${msg.senderUsername}`,
                    receiver: msg.receiverUsername,
                });
            } catch (err) {
                console.log(err);
            }
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("disconnect");
        });
    });
};

module.exports = SocketIo;
