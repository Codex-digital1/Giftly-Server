const mongoose = require("mongoose");

const giftSchema = mongoose.Schema(
  {
    giftName: {
      type: String,
      required: true,
    },
    store: {
      type: String,
      default: "Giftly",
    },
    brand: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    giftImage: {
      type: [],
      required: true,
    },
    productAddBy: {
      type: String,
      default: "admin",
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      enum: ["S", "M", "L", "XL"],
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      // enum: ["In Stock", "Out of Stock"],
      default: "In Stock",
    },
    quantity: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

const giftModel = mongoose.model("gifts", giftSchema);

module.exports = giftModel;





// const mongoose = require('mongoose');

// const giftSchema = new mongoose.Schema({
//   giftName: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   brand: {
//     type: String,
//     required: true
//   },
//   availability: {
//     type: String,
//     required: true
//   },
//   category: {
//     type: String,
//     required: true
//   },
//   size: {
//     type: String,
//     required: true
//   },
//   color: {
//     type: String,
//     required: true
//   },
//   giftType: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   giftImage: {
//     type: [String],
//     required: true
//   }
// });

 
// const giftModel = mongoose.model('Gift', giftSchema);

// module.exports = giftModel;
