const OrderModel = require("../../model/orderModelSchema");

const getSingleOrderInfoByProductId = async (req, res) => {
  try {
    const { productId } = req.params; // Get both id and email from params
    const { userEmail, tran_id } = req.body;

    console.log("Received productId:", productId, userEmail, tran_id);
    // Find order by both product id and user email
    const getData = await OrderModel.findOne({
      tran_id,
      userEmail,
    });

    if (getData?.order_status !== "Delivered") {
      return res.status(404).json({
        message: "Product is not delivered yet",
        error: true,
        success: false,
      });
    }

    if (!getData) {
      return res.status(404).json({
        message: "No order found with this product ID and email",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      data: getData,
      error: false,
      success: true,
      message: "Get a Gift successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const getAllOrderByUserEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const allOrders = await OrderModel.find({ userEmail: email }).populate("productIds");;
    console.log("allorders", allOrders);
    if (!allOrders) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(allOrders); // Respond with the user data
  } catch (error) {
    console.error("Error fetching user:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};

const getOrdersWithReviewsByUserEmail  = async (req, res) => {
  try {
    const email = req.params.email;

    const allOrders = await OrderModel.aggregate([
      {
        $match: { userEmail: email }
      },
      {
        $lookup: {
          from: "gifts", // gifts collection থেকে product info
          localField: "productIds",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      {
        $lookup: {
          from: "reviews", // reviews collection থেকে review info
          localField: "productIds",
          foreignField: "productId",
          as: "productReviews"
        }
      }
    ]);

    if (!allOrders || allOrders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
};


const OrderController = {
  getSingleOrderInfoByProductId,
  getAllOrderByUserEmail,
  getOrdersWithReviewsByUserEmail
}

module.exports = OrderController;