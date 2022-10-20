const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
    },
  });
  const Notification = mongoose.model('Notification', NotificationSchema);
  exports.Notification = Notification;