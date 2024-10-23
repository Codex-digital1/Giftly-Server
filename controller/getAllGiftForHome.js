const Gifts = require("../model/giftModelSchema");


const getAllGiftForHome = async (req, res) => {
    
    try {
    let gifts = await Gifts.find().sort({ createdAt: -1 }) 
    .limit(24);
        res.status(200).json({
            data: gifts,
            error: false,
            success: true,
            message: "Get all Gift  successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

module.exports = getAllGiftForHome;
