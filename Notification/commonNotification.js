const User=require('../model/userSchema')
const Notification=require('../model/NotificationSchema')
const{io}=require('../Notification/notification')
// console.log('gdfg');
// console.log(io,5);
const newGiftNotification= async(giftName,giftId)=>{
    const notification = new Notification({
      title: 'New Gift Added!',
      message: `A new gift, ${giftName}, has been added to our store. Check it out!`,
      gift: giftId,
      actionType:'new_gift'
    });
    await notification.save();
    io.emit('newNotification', notification);

}

const updateOrderStatusNotification=async(orderId,userId,newStatus)=>{

    // Notify the user about the status update
    const notification = new Notification({
        user: userId,
        title: 'Order Status Updated',
        message: `Your order #${orderId} status has been updated to ${newStatus}.`,
      });
      await notification.save();
  
      // Emit real-time notification to the user
      io.to(userId).emit('receiveNotification', notification);
}
module.exports={newGiftNotification,updateOrderStatusNotification}