const User = require('../model/userSchema')

const updateAUser = async (req, res) => {
  // console.log(req.body);

  try {
    // Update the user with filtered data
    let updatedUser = await User.findById(req.params.userId);
    if (!updatedUser) {
      return res.status(404).json({
        error: true,
        success: false,
        message: 'User not found',
      });
    }
     await User.updateOne({ _id: updatedUser._id }, req.body);
     updatedUser = await User.findById(req?.params?.userId);

    res.status(200).json({
      error: false,
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
    // console.log('User updated successfully:', updatedUser);
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

module.exports = updateAUser;
