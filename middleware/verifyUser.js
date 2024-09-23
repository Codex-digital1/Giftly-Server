
const jwt = require("jsonwebtoken");
const verifyUserToken = async (req, res, next) => {
    try{
        const token = req.cookies?.token

        // console.log("token",token)
        if(!token){
            return res.status(200).json({
                message : "Please Login...!",
                error : true,
                success : false
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
     
            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?._id
            next()
        });


    }catch(err){
        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
};

module.exports = verifyUserToken;
