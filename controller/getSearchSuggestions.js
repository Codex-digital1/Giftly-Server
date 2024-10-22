const giftModel = require("../model/giftModelSchema");
const getSearchSuggestions = async (req, res) => {
    const { query } = req.query; // Get the search query from the request
    // console.log(query);
    try {
        if (!query) {
            return res.status(400).json({ message: "Query parameter is required." });
        }
        // Use $regex to search giftName and description fields
        const suggestions = await giftModel.find(
            {
                $or: [
                    { giftName: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } }
                ]
            },
            { giftName: 1, _id: 1 } // Only return relevant fields
        ).limit(8); // Limit the number of suggestions
// console.log(suggestions);
        res.status(200).json({
            data: suggestions,
            success: true,
            message: 'Search suggestions fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
};

module.exports = getSearchSuggestions;
