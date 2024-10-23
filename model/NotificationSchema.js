const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
  },
  message: {
    type: String,
    required: true,
  },
  giftId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  title: {
    type: String,
  },
  actionType: {
    type: String,
    enum: ['new_gift', 'order_update', 'promo_offer'], // Define the types of notifications
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false, // To track if the notification has been read
  },
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports=Notification
