const giftModel = require("../model/giftModelSchema")

const uploadGift = async (req, res) => {
    try {
        // const UserId = req.userId

        // if(!uploadPermission(UserId)){
        //     throw new Error("Permission denied")
        // }
        
        const uploadGift = new giftModel(req?.body)
        const saveGift = await uploadGift.save()

        res.status(200).json({
            data: saveGift,
            error: false,
            success: true,
            message: "Gift uploaded successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = uploadGift;
