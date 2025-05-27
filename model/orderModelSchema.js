const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    tran_id: {
      type: String,
      required: true,
      unique: true,
    },

    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],

    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },

    // Optional: review system (multiple reviews for multiple products)
    reviews: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: String,
        ReviewerName: String,
        ReviewerProfileImage: String,
        reviewedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    payment_status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },
    order_status: {
      type: String,
      enum: ["Pending", "Processing", "Shipping", "Delivered"],
      default: "Pending",
    },
    isShedule: {
      type: Boolean,
      default: false,
    },
    scheduleDate: {
      type: String,
      default: null,
    },
    wrap: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
