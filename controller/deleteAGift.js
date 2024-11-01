const giftModel = require("../model/giftModelSchema")

const deleteAGift = async (req, res) => {
    console.log(req.params.giftId);
   
    console.log(req.params.id);
    try {
        const deletedGift = await giftModel.findByIdAndDelete(req.params.giftId);

        res.status(200).json({
            message: 'Gift deleted successfully',
            error: false,
            success: true
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

module.exports = deleteAGift;