const giftModel = require("../model/giftModelSchema")

const uploadGift = async (req, res) => {
    console.log(req.body,'inside the uploadGift');
    try {   
        const uploadGift = new giftModel(req?.body)
        const saveGift = await uploadGift.save()

        res.status(200).json({
            data: saveGift,
            error: false,
            success: true,
            message: "Gift uploaded successfully"
        })
        console.log('Post successfully',uploadGift);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

module.exports = uploadGift;
