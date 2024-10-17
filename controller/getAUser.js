const User = require('../model/userSchema')

const getAUser = async(req,res) => {
//  console.log(req.params.email);
    try {
        const getAUser = await User.findOne({email: req.params.email});
        // console.log("get ", getData)
        res.status(200).json({
            data: getAUser,
            error: false,
            success: true,
            message: "Get a User"
        })
//  console.log(getAUser);
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}
module.exports = getAUser;   