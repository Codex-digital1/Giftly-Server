const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gifts",
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  ReviewerName: {
    type: String,
    required: true,
  },
  ReviewerProfileImage: {
    type: String,
    required: true,
  },
  review: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    reviewedAt: {
      type: Date,
      default: Date.now,
    },
  },
}, {
  timestamps: true,
});

const ReviewsModel = mongoose.model("reviews", reviewsSchema);
module.exports = ReviewsModel;
