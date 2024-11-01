const User = require('../model/userSchema')

const Notification = require('../model/NotificationSchema')


class NotificationClass {
  constructor(io) {
    this.io = io;
    this.io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);
    
      socket.on('joinRoom', (userId) => {
        socket.join(userId); // Join the user's specific room
      });
    })
  }
  saveUserInIo(){

  }

  sendAll() {
    // console.log(this.io);
    this.io.on('connection', async (socket) => {
      // console.log('12 ,A user connected:', socket.id);
      const notifications = await Notification.find().sort({
          createdAt: -1
        })
        .limit(7);
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
        // console.log('User disconnected:', socket.id);
      });
    });
  }
  async newGiftNotification(giftName, giftId) {
    const notification = new Notification({
      title: 'New Gift Added!',
      message: `A new gift, ${giftName}, has been added to our store. Check it out!`,
      giftId: giftId,
      actionType: 'new_gift'
    });
    await notification.save();
    this.io.emit('newNotification', notification);
    return notification

  }
  async newDiscountNotification(coupon, discount, title, ) {
    const notification = new Notification({
      title: title,
      message: `Enjoy exclusive ${discount}% discounts and exciting offers on your favorite gifts use coupon ${coupon}! 🛍️✨`,
      actionType: 'promo_offer'
    });
    await notification.save();
    this.io.emit('newNotification', notification);
    return notification

  }
  async updateOrderStatusNotification(orderId, userEmail, newStatus) {
    // console.log(orderId, userEmail, newStatus);

    const user = await User.findOne({
      email: userEmail
    });
    if (!user) {
      throw new Error(`No user found with email: ${userEmail}`);
    }

    // Notify the user about the status update
    const notification = new Notification({
      user: user._id,
      title: 'Order Status Updated',
      message: `Your order #${orderId} status has been updated to ${newStatus}.`,
      orderId: orderId,
      actionType: "order_update"
    });
    // await notification.save();

    // Emit real-time notification to the user
    this.io.to(user._id).emit('receiveNotification', notification);
  }

}


module.exports = NotificationClass