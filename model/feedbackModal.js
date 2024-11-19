const mongoose = require('mongoose');
// Define User schema
const feedbackSchema = new mongoose.Schema({
  ReviewerName: {
    type: String,
    default: null
  },
  ReviewerProfileImage: {
    type: String,
    default: null
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  comment: {
    type: String,
    default: null
  },

  reviewedAt: {
    type: Date,
    default: null
  },
  ReviewerId: {
    type: String,
    default: null
  }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;