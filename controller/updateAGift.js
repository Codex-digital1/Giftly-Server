const giftModel = require("../model/giftModelSchema")

const updateAGift = async (req, res) => {
    try {
        const updatedGift = await giftModel.findByIdAndUpdate(req.params.giftId, req.body, { new: true });

        res.status(200).json({
            error: false,
            success: true,
            message: 'Gift updated successfully',
            data: updatedGift 
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

module.exports = updateAGift;
