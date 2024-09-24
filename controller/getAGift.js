const giftModel = require("../model/giftModelSchema")

const getAGift = async (req, res) => {
    try {

        const getData = await giftModel.findById(req.params.id);
        // console.log("get ", getData)
        res.status(200).json({
            data: getData,
            error: false,
            success: true,
            message: "Get a Gift  successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

module.exports = getAGift;
