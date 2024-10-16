const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    tran_id: {
      type: String,
      required: true,
      unique: true,
    },
    productId: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_brand: {
      type: String,
      required: true,
    },
    product_image: {
      type: [String],
      required: true,
    },
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
    // Review Start
    review: {
      type: {
        rating: {
          type: Number,
          min: 1,
          max: 5,
          // required: function () { return this.order_status === 'Delivered'; },
          default: null,
        },
        comment: {
          type: String,
          default: null,
        },
        reviewedAt: {
          type: Date,
          default: null,
        },
      },
      default: {},
    },
    // Review End
    payment_status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },
    order_status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipping', 'Delivered'],
        default: 'Pending',
    },
    isShedule: {
        type: Boolean,
        default: false,
      },
      sheduleDate: {
        type: String,
        default: null,
      },
    review: {
        type: {
            rating: {
                type: Number,
                min: 1,
                max: 5,
                // required: function () { return this.order_status === 'Delivered'; },
                default: null
            },
            comment: {
                type: String,
                default: null
            },
            reviewedAt: {
                type: Date,
                default: null
            }
        },
        default: {},
    }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
