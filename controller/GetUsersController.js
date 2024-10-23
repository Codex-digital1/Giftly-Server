const orderModel = require("../model/orderModelSchema");
const User = require("../model/userSchema")


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
        const Reviewer = await orderModel.find({ userEmail: email});  // Use `findOne` to get a single user

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
    const { rating, comment, tran_id,ReviewerName,ReviewerProfileImage } = req.body; // Review details from the request body
    // console.log("reviewer",ReviewerProfileImage)


    // Validate the request body
    if (!rating || !comment || !tran_id || !ReviewerName || !ReviewerProfileImage ) {
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



