const orderModelSchema = require("../model/orderModelSchema");

exports.getReviewByProductId = async (req, res) => {
//   console.log("getReviewByProductId hit");
  try {
    const productId = req?.params?.productId;
    const ReviewedProduct = await orderModelSchema.find({ productId });

    if (!ReviewedProduct) {
      return res.status(404).json({ message: "reviews not found" });
    }

    res.status(200).json(ReviewedProduct);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: error.message });
  }
};
