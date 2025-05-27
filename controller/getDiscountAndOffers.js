const discount = require('../model/discountAndOffersSchema');

const getDiscountAndOffers = async (req, res) => {
    // console.log('inside the getDiscountAndOffers controller');
    try {
        const getDiscount = await discount.find().sort({ createdAt: -1 }).limit(10); 
        
        // console.log(getDiscount, 'discount data fetched successfully'); // Log fetched data
        
        res.status(200).json({
            data: getDiscount,
            error: false,
            success: true,
            message: "Discounts retrieved successfully"
        });
    } catch (error) {
        console.error('Error fetching discounts:', error); // Log the error
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        });
    }
};

module.exports = getDiscountAndOffers;
