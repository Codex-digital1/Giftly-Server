const express = require("express")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose");
const router = require("./router/router");
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
const orderModel = require('./model/orderModelSchema')
const app = express()
const http = require("http");
const SocketIo = require("./chatApp/SocketIo");

// Middleware
app.use(cors({
    origin:
    [
 "http://localhost:5173",
 "https://giftly-ba979.web.app"
    ] ,
    credentials: true,
}));
app.use(express.json());
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI, { dbName: 'Giftly-server-db' })
    .then(() => {
        console.log("Giftly db is connected");
    })
    .catch((err) => console.log(err));

    
// Routes
app.use("/", router);
SocketIo(server);

app.get("/", async (req, res) => {
    res.send("Giftly db is connected");
});

// Define the success route
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
      // Send response based on the success of the order update
      res.redirect(`http://localhost:5173/payment/success/${tranId}`);
  } catch (error) {
      res.status(500).json({ message: "Payment success handling failed", error });
  }
});

server.listen(port, () => {
    console.log(`Giftly is running on port ${port}`);
});

