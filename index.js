const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const router = require("./router/router");
const port = process.env.PORT || 3000;

const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let users = {}; // Store users here

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { dbName: 'Giftly-server-db' })
    .then(() => {
        console.log("Giftly db is connected");
    })
    .catch((err) => console.log(err));

// Routes
app.use("/", router);

io.on("connection", (socket) => {
    console.log("New Connection", socket.id);

    socket.on('joined', ({ userInfo }) => {
        users[socket.id] = userInfo;
        console.log(`${userInfo} has joined with ID: ${socket.id}`);
        socket.broadcast.emit('userJoined', { userInfo: "Admin", message: `${users[socket.id]} has joined` });

        socket.emit('welcome', { userInfo: "Admin", message: `Welcome to the chat, ${users[socket.id]}` });
    });

    socket.on('message', ({ message, id }) => {
        console.log(`Message from ${users[id]}: ${message}`);
        io.emit('sendMessage', { userInfo: users[id], message, id });
    });

    socket.on('disconnect', () => {
        console.log(`${users[socket.id]} with ID ${socket.id} has left`);
        socket.broadcast.emit('leave', { userInfo: "Admin", message: `${users[socket.id]} has left` });
        delete users[socket.id]; // Remove the user from the list
    });
});

// Default route for server test
app.get("/", async (req, res) => {
    res.send("Giftly db is connected");
});

// Start server
server.listen(port, () => {
    console.log(`Giftly is running on port ${port}`);
});
