const { Server } = require('socket.io');

const Notification=require('../model/NotificationSchema')


class NotificationClass{
  constructor(server){
    this.server=server
    this.io = new Server(server, {
      cors: {
        origin: 'http://localhost:5173', // React frontend URL
        methods: ['GET', 'POST']
      }
    })
  }
  
  sendAll(){
this.io.on('connection', async(socket) => {
  console.log('12 ,A user connected:', socket.id);
  const notifications = await Notification.find()
  // console.log(notifications);
  // Emit a real-time notification when the user connects
  socket.emit('initialNotifications', notifications);

  // Example: Send a notification to a user
  socket.on('sendNotification', (notificationData) => {
    // Broadcast the notification to the connected clients
    io.emit('receiveNotification', notificationData);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
  }
 async newGiftNotification(giftName,giftId){
    const notification = new Notification({
      title: 'New Gift Added!',
      message: `A new gift, ${giftName}, has been added to our store. Check it out!`,
      gift: giftId,
      actionType:'new_gift'
    });
    await notification.save();
    this.io.emit('newNotification', notification);
    return notification

}
async updateOrderStatusNotification(orderId,userId,newStatus){

  // Notify the user about the status update
  const notification = new Notification({
      user: userId,
      title: 'Order Status Updated',
      message: `Your order #${orderId} status has been updated to ${newStatus}.`,
    });
    await notification.save();

    // Emit real-time notification to the user
    this.io.to(userId).emit('receiveNotification', notification);
}
  
}

const notification= (server)=>{return server}
// console.log(notification);
// // const notification= ()=>{
// // Initialize Socket.IO
// const io = new Server(notification, {
//     cors: {
//       origin: 'http://localhost:5173', // React frontend URL
//       methods: ['GET', 'POST']
//     }
//   });
// Socket.IO connection handler
// io.on('connection', async(socket) => {
//     console.log('12 ,A user connected:', socket.id);
//     const notifications = await Notification.find()
//     // console.log(notifications);
//     // Emit a real-time notification when the user connects
//     socket.emit('initialNotifications', notifications);
  
//     // Example: Send a notification to a user
//     socket.on('sendNotification', (notificationData) => {
//       // Broadcast the notification to the connected clients
//       io.emit('receiveNotification', notificationData);
//     });
  
//     // Handle disconnection
//     socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);
//     });
//   });
  
  // module.exports={io}
// }


module.exports={notification,NotificationClass}