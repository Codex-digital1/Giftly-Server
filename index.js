const express = require("express")
const cors = require("cors")
require("dotenv").config()
const http = require('http');

const mongoose = require("mongoose");
const socketIO = require('socket.io');
const router = require("./router/router");
const app = express()
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
const io = socketIO(server, {
    cors: {
      origin: '*', // Allow cross-origin connections if you're testing with different domains
      methods: ['GET', 'POST']
    } 
  });
app.use(express.json()) 
const Notification=require('./model/NotificationSchema')




const notifications = [
    { message: 'New gift items are available!', timestamp: Date.now() },
    { message: 'Flash sale on selected items!', timestamp: Date.now() },
];

// Initialize socket.io
io.on('connection', (socket) => {
    console.log('User connected: ', socket.id);

    // Emit a real-time notification when the user connects
    socket.emit('initialNotifications', notifications);

    // Emit notifications on some custom event (e.g., new gift added)
    // setInterval(() => {
    //     const newNotification = { message: 'New gifts just arrived!', timestamp: Date.now() };
    //     io.emit('newNotification', newNotification);
    // }, 60000);  // Sends a notification every minute (for demo purposes)

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
    });
});
  // Example route that triggers a notification
app.post('/api/notify', async (req, res) => {
    const { email, message } = req.body;
    console.log(req.body);
  
    // Save notification in the database (optional)
    const notification = new Notification({
      email,
      message,
      isRead: false,
    });
    await notification.save();
  
    // Send real-time notification
    sendNotification(email, message);
  
    res.status(200).send('Notification sent');
  });
mongoose.connect(process.env.MONGO_URI, { dbName: 'Giftly-server-db' })
    .then(() => {
        console.log("Giftly db is connected")
    })
    .catch((err) => console.log(err))

app.use("/", router)


// Define the success route
app.post('/payment/success/:tranId', async (req, res) => {
    const { tranId } = req.params;
    console.log('Transaction ID:', tranId);
    // Handle the success logic
    res.redirect(`http://localhost:5173/payment/success/${req.params.tranId}`)
    // res.send({ message: `Payment successful for transaction ID: ${tranId}` });
}); 


app.get("/", async(req,res)=>{
    res.send(" Giftly db is connected")
})
server.listen(port, () => {
    console.log(`Giftly is running on this ${port} port`)
})
