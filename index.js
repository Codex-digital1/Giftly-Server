const express = require("express")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose");
const socketIO = require('socket.io');
const router = require("./router/router");
const app = express()
const http=require('http')
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const orderModel = require('./model/orderModelSchema')
const SocketIo = require("./chatApp/SocketIo");
 const {notification,NotificationClass} = require('./Notification/notification');
// Middleware

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
}));


mongoose.connect(process.env.MONGO_URI, { dbName: 'Giftly-server-db' })
    .then(() => {
        console.log("Giftly db is connected");
    })
    .catch((err) => console.log(err));

    
// Routes
app.use("/", router);
SocketIo(server);
notification(server) 
const notificationClass=new NotificationClass(server)
notificationClass.sendAll()

// Define the success route
// app.post('/payment/success/:tranId', async (req, res) => {
//   const { tranId } = req.params;
//   console.log('Transaction ID:', tranId);
//   try {
//       const order = await orderModel.findOne({ tran_id: tranId }); 
//       if (!order) {
//           return res.status(404).json({ message: "Order not found" });
//       }
//       order.payment_status = "Success";
//       await order.save(); 
//       // Send response based on the success of the order update
//       res.redirect(`http://localhost:5173/payment/success/${tranId}`);
//   } catch (error) {
//       res.status(500).json({ message: "Payment success handling failed", error });
//   }
// });
 


app.get("/", async(_req,res)=>{
    res.send(" Giftly db is connected")
})
server.listen(port, () => {
    console.log(`Giftly is running on this ${port} port`)
})
module.exports={notificationClass,hi:'hello'}