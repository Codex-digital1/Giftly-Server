const mongoose = require('mongoose');
// Define User schema
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Different roles: User,  Admin
      default: 'user',
    },
    phoneNumber: {
      type: String,
      match: [
        /^[\d]{10,15}$/,
        'Please enter a valid phone number between 10 and 15 digits',
      ],
      default: '',
    },
    profileImage: {
      type: String,
      default: '',
    },
    address: {
        street: {
          type: String,
          default: '',
        },
        city: {
          type: String,
          default: '',
        },
        state: {
          type: String,
          default: '',
        },
        zipCode: {
          type: String,
          default: '',
        },
        country: {
          type: String,
          default: '',
        },
      },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  });
  const User = mongoose.model('User', userSchema);

module.exports = User;