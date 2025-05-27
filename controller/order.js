const SSLCommerzPayment = require("sslcommerz-lts");
const mongoose = require("mongoose");
require("dotenv").config();

const giftModel = require("../model/giftModelSchema");
const orderModel = require("../model/orderModelSchema");

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false;

const order = async (req, res) => {
  const localORProduction =
    process.env.VITE_SUCCESS_URL || "http://localhost:5173";
  const user = req.body;

  // ✅ Step 1: Multiple product IDs check
  if (!Array.isArray(user.productIds) || user.productIds.length === 0) {
    return res.status(400).json({ message: "No product IDs provided" });
  }

  //   Check Find all products from DB
  const products = await giftModel.find({
    _id: { $in: user.productIds },
  });

  if (!products || products.length === 0) {
    return res.status(404).json({ message: "Products not found" });
  }

  // Create transaction ID for the transaction
  const tran_id = new mongoose.Types.ObjectId().toString();

  //   SSLCommerz data
  const data = {
    total_amount: user.total,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `${localORProduction}/payment/success/${tran_id}`,
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Multiple Products",
    product_category: "Mixed",
    product_profile: "general",
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: user.address,
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: user.number,
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  // ✅ Step 5: Init payment
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz
    .init(data)
    .then(async (apiResponse) => {
      const GatewayPageURL = apiResponse.GatewayPageURL;

      // ✅ Step 6: Create and save order
      const newOrder = new orderModel({
        userName: user.name,
        userEmail: user.email,
        userPhone: user.number,
        tran_id: tran_id,
        productIds: user.productIds, // ✅ this field should be array in schema
        total_amount: user.total,
        payment_status: "Pending",
        order_status: "Pending",
        reviews: [], // initially empty
        wrap: user.wrap,
        message: user.message,
        scheduleDate: user.scheduleDate || "",
        isShedule: !!user.scheduleDate,
      });

      const saveOrder = await newOrder.save();
      console.log("Order Saved:", saveOrder);

      // ✅ Step 7: Send payment URL
      res.send({ url: GatewayPageURL });
    })
    .catch((error) => {
      console.error("SSLCommerz error:", error);
      res.status(500).json({ message: "Payment initialization failed" });
    });
};

module.exports = order;
