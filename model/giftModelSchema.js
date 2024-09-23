const mongoose = require("mongoose")

const giftSchema = mongoose.Schema({
    giftName: {
        type: String,
    },
    price: Number,
}, { timestamps: true }
)

const giftModel = mongoose.model("gifts", giftSchema)

module.exports = giftModel;