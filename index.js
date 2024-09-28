const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const router = require("./router/router");
const port = process.env.PORT || 3000;

const http = require("http");
const SocketIo = require("./chatApp/SocketIo");
// const setupSocket = require("./chatApp/socket");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { dbName: 'Giftly-server-db' })
    .then(() => {
        console.log("Giftly db is connected");
    })
    .catch((err) => console.log(err));

    
// Routes
app.use("/", router);
// setupSocket(server);
SocketIo(server);

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

