const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userEmail: { type:String, ref: 'User' },
  message: String,
  type: { type: String, enum: ['new_gift', 'discount', 'order_status'] },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports=Notification
