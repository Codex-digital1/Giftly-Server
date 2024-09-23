const giftModel = require("../model/giftModelSchema")

const getAllGift = async (req, res) => {
    try {

        const getData = await giftModel.find();
        // console.log("get ", getData)

        res.status(200).json({
            data: getData,
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

module.exports = getAllGift;
