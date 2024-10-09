const User = require('../model/userSchema')

const getAllUsers = async (req, res) => {

    // res.send("Hello world")
    console.log("All USer get")
    try {
        const getAUser = await User.find();
        res.status(200).json({
            data: getAUser,
            error: false,
            success: true,
            message: "Get a User"
        })
        console.log("allUser");
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
        console.log(error)
    }
}
module.exports = getAllUsers;   