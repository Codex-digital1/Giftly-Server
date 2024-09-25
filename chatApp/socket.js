const socketIO = require("socket.io");
const Message = require("../model/chatModel"); // Import the Message model

let users = {}; // Store users here

const setupSocket = (server) => {
    const io = socketIO(server);

    io.on("connection", (socket) => {
        console.log("New Connection", socket.id);

        // When a user joins
        socket.on('joined', ({ userInfo }) => {
            users[socket.id] = userInfo;
            console.log(`${userInfo} has joined with ID: ${socket.id}`);

            // Notify other users
            socket.broadcast.emit('userJoined', { userInfo: "Admin", message: `${users[socket.id]} has joined` });

            // Send welcome message to the user who joined
            socket.emit('welcome', { userInfo: "Admin", message: `Welcome to the chat, ${users[socket.id]}` });
        });

        // When a user sends a message
        socket.on('message', async ({ message, id, timestamp }) => {
            console.log(`Message from ${users[id]}: ${message}`);
            
            // Save the message with timestamp to MongoDB
            const newMessage = new Message({ userInfo: users[id], message, timestamp });

            try {
                await newMessage.save(); // Save message to MongoDB
                
                // Broadcast message to all clients with the timestamp
                io.emit('sendMessage', { userInfo: users[id], message, id, timestamp });
            } catch (err) {
                console.error("Error saving message:", err);
            }
        });

        // When a user disconnects
        socket.on('disconnect', () => {
            console.log(`${users[socket.id]} with ID ${socket.id} has left`);
            
            // Notify others that the user has left
            socket.broadcast.emit('leave', { userInfo: "Admin", message: `${users[socket.id]} has left` });
            delete users[socket.id]; // Remove the user from the list
        });
    });
};

module.exports = setupSocket;
