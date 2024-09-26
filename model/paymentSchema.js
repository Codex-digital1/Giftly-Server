const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    giftName: {
        type: String,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    giftImage: {
        type: [],
        required: true
    },
    productAddBy: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: String,
        enum: ["S", "M", "L", "XL"],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["All", "Gift for Him", "Gift for Her", "Tech Gift"],
        required: true
    },
    availability: {
        type: String,
        enum: ["In Stock", "Out of Stock"],
        default: "In Stock"
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const paymentModal = mongoose.model("payment", paymentSchema);

module.exports = paymentSchema;