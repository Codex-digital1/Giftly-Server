const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./router/router");
const http = require("http");
const port = process.env.PORT || 3000;
const orderModel = require('./model/orderModelSchema');
const { Server } = require('socket.io');
const SocketIo = require("./chatApp/SocketIo");
const { NotificationClass } = require('./Notification/notification');

// Initialize Express
const app = express();

// Middleware 
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://giftly-ba979.web.app",
    "https://giftlyvirtualstore.vercel.app"
  ],
  credentials: true,
}));
app.use(express.json());

// Create HTTP Server
const server = http.createServer(app);

// Create a single Socket.IO instance
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { dbName: 'Giftly-server-db' })
  .then(() => console.log("Giftly db is connected"))
  .catch(err => console.log(err));

// Routes
app.use("/", router);

// Initialize SocketIo and Notifications
SocketIo(io);
const notificationClass = new NotificationClass(io);
notificationClass.sendAll();

// Define Routes
app.get("/", async (req, res) => {
  res.send("Giftly db is connected");
});

app.post('/payment/success/:tranId', async (req, res) => {
  const { tranId } = req.params;
  console.log('Transaction ID:', tranId);
  try {
    const order = await orderModel.findOne({ tran_id: tranId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.payment_status = "Success";
    await order.save();
    res.redirect(`http://localhost:5173/payment/success/${tranId}`);
  } catch (error) {
    res.status(500).json({ message: "Payment success handling failed", error });
  }
});
// Start the server
server.listen(port, () => {
    console.log(`Giftly is running on port ${port}`);
});

// Export the server for Vercel
module.exports = { server,notificationClass };
