const express = require("express")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose");
const router = require("./router/router");
const app = express()
const http=require('http')
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const SocketIo = require("./chatApp/SocketIo");
 const {notification,NotificationClass} = require('./Notification/notification');
// Middleware

app.use(express.json());
app.use(cors({
    origin:
    [
 "http://localhost:5173",
 "https://giftly-ba979.web.app"
    ] ,
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


app.get("/", async(_req,res)=>{
    res.send(" Giftly db is connected")
})
server.listen(port, () => {
    console.log(`Giftly is running on this ${port} port`)
})
module.exports={notificationClass,hi:'hello'}