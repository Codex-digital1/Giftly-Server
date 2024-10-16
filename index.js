// const express = require("express")
// const cors = require("cors")
// require("dotenv").config()
// const mongoose = require("mongoose");
// const router = require("./router/router");
// const port = process.env.PORT || 3000;
// const socketIO = require('socket.io');
// const orderModel = require('./model/orderModelSchema')
// const app = express()
// const http = require("http");
// const SocketIo = require("./chatApp/SocketIo");

// // Middleware
// app.use(cors({
//     origin:
//     [
//  "http://localhost:5173",
//  "https://giftly-ba979.web.app"
//     ] ,
//     credentials: true,
// }));
// app.use(express.json());
// const server = http.createServer(app);

// mongoose.connect(process.env.MONGO_URI, { dbName: 'Giftly-server-db' })
//     .then(() => {
//         console.log("Giftly db is connected");
//     })
//     .catch((err) => console.log(err));

    
// // Routes
// app.use("/", router);
// SocketIo(server);

// app.get("/", async (req, res) => {
//     res.send("Giftly db is connected");
// });

// // Define the success route
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

// server.listen(port, () => {
//     console.log(`Giftly is running on port ${port}`);
// });



// deploy e kaj kore an .
const express = require("express")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose");
const router = require("./router/router");
const port = process.env.PORT || 3000;
const orderModel = require('./model/orderModelSchema')
const app = express()


const http = require("http");
const { Server } = require('socket.io');
const SocketIo = require("./chatApp/SocketIo");
const {NotificationClass} = require('./Notification/notification');


// Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://giftly-ba979.web.app"
    ],
    credentials: true,
}));
app.use(express.json());

const server = http.createServer(app);
// Create only one socket.io instance
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { dbName: 'Giftly-server-db' })
    .then(() => {
        console.log("Giftly db is connected");
    })
    .catch((err) => console.log(err));

// Routes
app.use("/", router);

// Pass the same io instance to both SocketIo and NotificationClass
SocketIo(io);
const notificationClass = new NotificationClass(io);
notificationClass.sendAll();

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

// Start the server
server.listen(port, () => {
    console.log(`Giftly is running on port ${port}`);
});

// Export the server (or app) as the default export
module.exports = server;
