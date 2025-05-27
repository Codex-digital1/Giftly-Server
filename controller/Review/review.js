const OrderModel = require("../../model/orderModelSchema");
const ReviewsModel = require("../../model/reviewModelSchema");

const submitSingleReviewByUser = async (req, res) => {
  const userEmail = req.params.email;
  const {
    rating,
    comment,
    tran_id,
    ReviewerName,
    ReviewerProfileImage,
    productId,
  } = req.body;

  // Validation
  if (
    !rating ||
    !comment ||
    !tran_id ||
    !ReviewerName ||
    !ReviewerProfileImage ||
    !productId
  ) {
    return res.status(400).json({
      message:
        "All fields (rating, comment, tran_id, ReviewerName, ReviewerProfileImage, productId) are required",
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    // Step 1: Find the order
    const order = await OrderModel.findOne({
      userEmail: userEmail,
      tran_id: tran_id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Delivered order not found with this transaction ID and email",
      });
    }

    // Step 2: Check if productId exists in the order
    const productExists = order?.productIds.includes(productId);
    if (!productExists) {
      return res
        .status(400)
        .json({ message: "This product is not part of the delivered order" });
    }

    // Step 3: Check if review already exists
    const existingReview = await ReviewsModel.findOne({ productId, userEmail });

    if (existingReview) {
      // Update existing review
      existingReview.review.rating = rating;
      existingReview.review.comment = comment;
      existingReview.review.reviewedAt = new Date();
      await existingReview.save();

      return res.status(200).json({
        message: "Review updated successfully!",
        review: existingReview,
      });
    } else {
      // Create new review
      const newReview = new ReviewsModel({
        productId,
        userEmail,
        ReviewerName,
        ReviewerProfileImage,
        review: {
          rating,
          comment,
          reviewedAt: new Date(),
        },
      });
      await newReview.save();

      return res.status(200).json({
        message: "Review submitted successfully!",
        review: newReview,
      });
    }
  } catch (error) {
    console.error("Error submitting review:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleReviewByProductId = async (req, res) => {
  try {
    const productId = req?.params?.productId;
    const ReviewedProduct = await ReviewsModel.find({ productId });

    if (!ReviewedProduct) {
      return res.status(404).json({ message: "reviews not found" });
    }

    res.status(200).json(ReviewedProduct);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: error.message });
  }
};

// find review by user email
const getAllReviewsByUser = async (req, res) => {
    try {
        const email = req.params.email;
        const Reviews = await ReviewsModel.find({ userEmail: email }).populate("productId"); 
        if (!Reviews) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(Reviews);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: error.message });
    }
};

const ReviewController = {
  submitSingleReviewByUser,
  getSingleReviewByProductId,
  getAllReviewsByUser
};
module.exports = ReviewController;
