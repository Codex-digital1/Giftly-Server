const User = require('../model/userSchema')

const updateAUser = async (req, res) => {

  try {
    // Update the user with filtered data
    const updatedUser = await User.findByIdAndUpdate(req.params.userId,req.body);

    if (!updatedUser) {
      return res.status(404).json({
        error: true,
        success: false,
        message: 'User not found',
      });
    }

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
