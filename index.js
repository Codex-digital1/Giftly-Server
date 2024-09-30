const express = require("express")
const cors = require("cors")
require("dotenv").config()

const mongoose = require("mongoose");
const router = require("./router/router");
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');

const http = require("http");
const SocketIoFile = require("./chatApp/SocketIo");
// const setupSocket = require("./chatApp/socket");

const app = express();
// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

const Notification = require('./model/NotificationSchema')
const server = http.createServer(app);
const io = socketIO(server);

// When a client connects to the socket
io.on('connection', (socket) => {
  console.log('New client connected: ', socket.id);

  // Join a room based on the user ID
  socket.on('join', (userId) => {
    socket.join(userId);  // This user will now receive messages sent to this room
    console.log(`User ${userId} joined room`);
  });
  // When the client disconnects
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
// Function to send a notification to a specific user
const sendNotification = async (email, message) => {
  io.to(email).emit('newNotification', message);  // Send real-time notification
};
// Example route that triggers a notification
app.post('/api/notify', async (req, res) => {
  const { userId, message } = req.body;

  // Save notification in the database (optional)
  const notification = new Notification({
    userId,
    message,
    isRead: false,
  });
  await notification.save();

  // Send real-time notification
  sendNotification(userId, message);

  res.status(200).send('Notification sent');
});

mongoose.connect(process.env.MONGO_URI, { dbName: 'Giftly-server-db' })
  .then(() => {
    console.log("Giftly db is connected");
  })
  .catch((err) => console.log(err));


// Routes
app.use("/", router);
// setupSocket(server);
SocketIoFile(server);

app.get("/", async (req, res) => {
  res.send("Giftly db is connected");
});

// Define the success route
app.post('/payment/success/:tranId', async (req, res) => {
  const { tranId } = req.params;
  console.log('Transaction ID:', tranId);
  // Handle the success logic
  res.redirect(`http://localhost:5173/payment/success/${req.params.tranId}`)
  // res.send({ message: `Payment successful for transaction ID: ${tranId}` });
});

server.listen(port, () => {
  console.log(`Giftly is running on port ${port}`);
});

