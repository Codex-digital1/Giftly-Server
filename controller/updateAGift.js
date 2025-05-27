const giftModel = require("../model/giftModelSchema");

const updateAGift = async (req, res) => {
  const updateData = Object.keys(req.body).reduce((acc, key) => {
 
    if (key === 'images') {
      if (req.body[key] && req.body[key].length > 0) {
        acc[key] = req.body[key];  
      }
      return acc;  
    }
 
    if (req.body[key] !== '' && req.body[key] !== null) {
      acc[key] = req.body[key];
    }

    return acc;
  }, {});

  try {
    // Update the gift with filtered data
    const updatedGift = await giftModel.findByIdAndUpdate(req.params.giftId, updateData, { new: true });

    if (!updatedGift) {
      return res.status(404).json({
        error: true,
        success: false,
        message: 'Gift not found',
      });
    }

    res.status(200).json({
      error: false,
      success: true,
      message: 'Gift updated successfully',
      data: updatedGift,
    });
    console.log('Gift updated successfully:', updatedGift);
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

module.exports = updateAGift;
