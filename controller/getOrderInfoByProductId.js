const orderModelSchema = require("../model/orderModelSchema");

exports.getOrderInfoByProductId = async (req, res) => {
    try {
        const { id, email } = req.params; // Get both id and email from params

        // Find order by both product id and user email
        const getData = await orderModelSchema.findOne({ tran_id: id, userEmail: email});

        if (getData?.order_status !== "Delivered"){
            return res.status(404).json({
                message: "Product is not delivered yet",
                error: true,
                success: false
            });
        }

        if (!getData) {
            return res.status(404).json({
                message: "No order found with this product ID and email",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            data: getData,
            error: false,
            success: true,
            message: "Get a Gift successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        });
    }
};

