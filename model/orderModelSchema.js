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
        ref: "gifts",
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

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;
