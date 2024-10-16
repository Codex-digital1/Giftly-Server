const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the coupon
const discountAndOffersSchema = new Schema(
  {
    coupon: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,  
      max: 100,  
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,  
  }
);
const discountAndOffers = mongoose.model('DiscountAndOffer', discountAndOffersSchema);

module.exports = discountAndOffers;
