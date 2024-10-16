const discountSchema = require("../model/discountAndOffersSchema");

const uploadADiscount = async (req, res) => {
  console.log(req.body, 'inside the updateAGift');
  try {
    // Destructure fields from req.body
    const { coupon, discount, title, description } = req.body;

    // Create a new discount document
    const newDiscount = new discountSchema({
      coupon,
      discount,
      title,
      description,
    });
console.log(newDiscount);

    // Save the discount to the database
    const saveDiscount = await newDiscount.save();

    // Send success response
    res.status(200).json({
        data: saveDiscount,
        error: false,
        success: true,
        message: "Discount save successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
        message: error.message,
        error: true,
        success:    false  
    });
}

  
};

module.exports = uploadADiscount;