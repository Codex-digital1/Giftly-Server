const User = require("../model/userSchema");

const userRoleChange = async (req, res) => {
    const { email } = req.params;  // Extracting email from the request parameters


    try {
        // Find the user by email
        const getAUser = await User.findOne({ email });

        if (!getAUser) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "User not found",
            });
        }

        // Log the retrieved user data
        console.log("Retrieved user:", getAUser);


        if (getAUser?.role === "user") {
            getAUser.role = "admin"
        } else if (getAUser?.role === "admin") {
             getAUser.role = "user"
        }

        await getAUser.save();

        // Send the updated user data in response
        res.status(200).json({
            data: getAUser,
            error: false,
            success: true,
            message: "User role updated successfully",
        });

    } catch (error) {
        // Handle errors
        res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
};

module.exports = userRoleChange;
