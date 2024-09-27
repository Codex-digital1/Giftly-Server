const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
    user: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        number: { type: String, required: true }
    },
    product: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Gift', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true }
    },
    paidStatus: { type: Boolean, default: false },
    transactionId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
