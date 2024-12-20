const giftModel = require("../model/giftModelSchema");


const getAllGift = async (req, res) => {
    const { category, priceMin, priceMax, rating, availability, sortBy, search } = req?.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    // console.log(req.query);
       // Create a filter object
       let filter = {};

       // Apply Category filter if provided
       if (category && category !== '') {
           filter.category = category;
       }
   
       // Apply Price Range filter (make sure to convert to numbers)
       filter.price = { 
           $gte: parseFloat(priceMin) || 0, 
           $lte: parseFloat(priceMax) || 5000000 
       };
   
       // Apply Rating filter (convert to number)
       if (parseFloat(rating) > 0) {
           filter.rating = { $gte: parseFloat(rating) };
       }
   
       // Apply Availability filter (skip if 'all' is selected)
       if (availability && availability !== 'all') {
           filter.availability = availability;
       
        }
   
       // Apply Search filter if provided
       if (search) { 
        filter.$text = { $search: search };
       }
    try {

        // Query the database with filters
        // console.log(filter);
    let gifts = await giftModel.find(filter).skip(skip).limit(limit);
    // console.log(gifts.length);

    // Sorting (e.g., sort by price, rating, etc.)
    if (sortBy === 'priceAsc') {
        gifts = gifts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
        gifts = gifts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
        gifts = gifts.sort((a, b) => b.createAt - a.createAt);
    }

        res.status(200).json({
            data: gifts,
            error: false,
            success: true,
            message: "Get all Gift  successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

module.exports = getAllGift;
