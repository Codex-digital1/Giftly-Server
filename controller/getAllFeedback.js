const Feedback = require("../model/feedbackModal");


const getAllFeedback = async (req, res) => {
    console.log('feedback');
    
    try {
    let feedback = await Feedback.find();
    console.log(feedback);
        res.status(200).json({
            data: feedback,
            error: false,
            success: true,
            message: "Get all Feedback  successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message,
            error: true,
            success: false,
            d:'sdmvsdmflkmv'
        })
    }
}

module.exports = getAllFeedback;
