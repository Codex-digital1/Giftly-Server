const giftModel = require("../model/giftModelSchema");
const getUniqueCategories = async (req, res) => {
    try {
        // Use the distinct() method to get all unique categories
        const categories = await giftModel.distinct('category');

        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No categories found',
            });
        }

        res.status(200).json({
            success: true,
            data: categories,
            message: 'Unique categories fetched successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { getUniqueCategories };
