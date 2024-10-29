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

/**
 * @Desc Update Order Status
 * @Method Patch
 * @Params ID
 * @Access Private
 */
const updateOrderStatus = async (req, res) => {

  // Get Value From Body
  const {status} = req.body
  // Get Value From Params
  const {id} = req.params

  try {
    // Get Order By ID
    const order = await Order.findById(id);

    // Validation
    if (!order)
      return res
        .status(404)
        .json({ message: "Order Not Found", success: false });

    // Update Status
    order.order_status = status || order.order_status;
    // Update Delevery Shedule
    if (order?.isShedule && order?.isShedule === true) {
      order.isShedule = false;
      order.sheduleDate = "";
    }


    await order.save();
    console.log(52,order._id,order.userEmail ,status || order.order_status);
    const { notificationClass} = require('../index');
        // Check if newGiftNotification exists before calling it
        if (notificationClass?.updateOrderStatusNotification) {
          // orderId, userId, newStatus
            await notificationClass.updateOrderStatusNotification(order._id,order.userEmail ,status || order.order_status);
        } else {
            console.log("newGiftNotification method not found");
        }
    return res
      .status(200)
      .json({ order, message: "Status Updated Successful", 
        success: true });
  } catch (error) {
    console.error("Error updateOrderStatus:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @Desc Get Specific User Orders List
 * @Method GET
 * @Params ID
 * @Access Private
 */
const getSpecificUserOrdersList = async (req, res) => {

  // Get Value From Params
  const {email} = req.params

  try {

    // Get Order By ID
    const orders = await Order.find({userEmail:email});

    // Validation
    if(!orders) return res.status(404).json({message: 'Order Not Found', success:false});
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error updateOrderStatus:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { orderManage, updateOrderStatus, getSpecificUserOrdersList };
