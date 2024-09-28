const User = require("../model/UserModel");

exports.createUser = async (req, res) => {
    try {
        const { userName, email, role, profileImage } = req.body;
        console.log(req.body)
        const newUser = new User({ userName, email, role, profileImage  });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);  // Respond with the user data
    } catch (error) {
        console.error("Error fetching user:", error);  // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};


