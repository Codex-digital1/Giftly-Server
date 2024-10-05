const Order = require("../model/orderModelSchema");

/**
 * @Desc Get All User Orders
 * @Method GET
 * @Access Private
 */
const orderManage = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error orderManage:", error);
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { orderManage };
