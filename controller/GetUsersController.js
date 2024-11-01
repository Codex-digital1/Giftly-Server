const Feedback = require("../model/feedbackModal");
const orderModelSchema = require("../model/orderModelSchema");
const orderModel = require("../model/orderModelSchema");
const User = require("../model/userSchema");


exports.getUsers = async (req, res) => {
    try {
        const getAlluser = await User.find();

        // Use status 200 for successful GET requests
        res.status(200).json(getAlluser);
    } catch (error) {
        console.error("Error fetching users:", error); // Log the error for debugging
        res.status(400).json({ error: error.message });
    }
};

exports.getSingleUser = async (req, res) => {
    try {
        const email = req.params.email;  // Get the email from URL parameters
        const user = await User.findOne({ email });  // Use `findOne` to get a single user
        // console.log(user, "current")
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);  // Respond with the user data
    } catch (error) {
        console.error("Error fetching user:", error);  // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};

exports.getReceiverData = async (req, res) => {
    try {
        const receiverName = req.params.receiverName;
        const receiverData = await User.findOne({ name: receiverName });
        // console.log(receiverData, "receiver")
        if (!receiverData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(receiverData);  // Respond with the user data
    } catch (error) {
        console.error("Error fetching user:", error);  // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};

// Update the current user's receiver
exports.updateReceiver = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from URL parameters
        const { receiver } = req.body; // Extract receiver from request body

        // Find user by ID and update the receiver field
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            userId,
            { $set: { "chat.receiver": receiver } },  // Update receiver in the chat object
            { new: true }  // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);  // Respond with the updated user data
    } catch (error) {
        console.error("Error updating receiver:", error);
        res.status(500).json({ error: error.message });
    }
};


// find review by user email
exports.getReviewByUser = async (req, res) => {
    try {
        const email = req.params.email;  // Get the email from URL parameters
        const Reviewer = await orderModel.find({ userEmail: email });  // Use `findOne` to get a single user

        if (!Reviewer) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(Reviewer);  // Respond with the user data
    } catch (error) {
        console.error("Error fetching user:", error);  // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};


exports.submitReviewByUser = async (req, res) => {
    const userEmail = req.params.email; // User email from the route params
    const { rating, comment, tran_id, ReviewerName, ReviewerProfileImage } = req.body; // Review details from the request body
    // console.log("reviewer",ReviewerProfileImage)


    // Validate the request body
    if (!rating || !comment || !tran_id || !ReviewerName || !ReviewerProfileImage) {
        return res.status(400).json({ message: "Rating, comment, and transaction ID are required" });
    }

    // Validate the rating value
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }


    try {
        // Find the order by user email where order status is 'Delivered'
        const order = await orderModel.findOneAndUpdate(
            { userEmail: userEmail, order_status: 'Delivered', tran_id: tran_id },
            {
                "review.rating": rating,
                "review.comment": comment,
                "review.ReviewerName": ReviewerName,
                "review.ReviewerProfileImage": ReviewerProfileImage,
                "review.reviewedAt": Date.now(),

            },
            { new: true }
        );

        // console.log('updated', order)

        if (!order) {
            return res.status(404).json({ message: "No delivered order found for this user or invalid email" });
        }

        res.status(200).json({
            message: "Review submitted successfully!",
            order,
        });
    } catch (error) {
        console.error("Error submitting review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllReview = async (req, res) => {
    try {
        // Fetch only documents where review.comment is not null
        const data = await orderModelSchema.find({ "review.comment": { $ne: null } });

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No reviews found" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.uploadTestimonial = async (req, res) => {
    try {
        const { ReviewerName, ReviewerProfileImage, comment, rating, reviewedAt, _id } = req?.body;
        const testimonial = {
            ReviewerName, ReviewerProfileImage, comment, rating, reviewedAt, ReviewerId: _id
        }

        const existingTestimonial = await Feedback.findOne({ ReviewerId: _id });
        console.log("167", existingTestimonial)
        if (existingTestimonial) {
            return res.status(400).json({ message: "This testimonial has already been uploaded." });
        }

        const newTestimonial = new Feedback(testimonial);
        const saveTestimonial = await newTestimonial.save();

        if (!saveTestimonial) {
            return res.status(404).json({ message: "No uploaded testimonial found" });
        }

        res.status(200).json(saveTestimonial);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: error.message });
    }
};



