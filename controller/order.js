const SSLCommerzPayment = require("sslcommerz-lts");
const mongoose = require("mongoose");
require("dotenv").config();
require("dotenv").config();
const giftModel = require("../model/giftModelSchema");
const orderModel = require("../model/orderModelSchema");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; // true for live, false for sandbox

const order = async (req, res) => {
  const user = req.body;
//   console.log(user, 777);
  // Get product by ID for better security
  const singleProduct = await giftModel.findById(user?.productIds);
  if (!singleProduct){
    return res.status(404).json({
      message: "Product not found",
    });
  }
//   console.log("single product", singleProduct);
  // console.log(singleProduct.brand, 'single product brand');

  const tran_id = new mongoose.Types.ObjectId().toString();

  const data = {
    total_amount: user.total,
    currency: "BDT",
    tran_id: tran_id,

    success_url: `${process.env.SERVER_BASE_URL}/payment/success/${tran_id}`,
    fail_url: `${process.env.SERVER_BASE_URL}/fail`,
    cancel_url: `${process.env.SERVER_BASE_URL}/cancel`,
    ipn_url: `${process.env.SERVER_BASE_URL}/ipn`,
    shipping_method: "Courier",
    product_name: singleProduct?.name || "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: user?.name,
    cus_email: user?.email,
    cus_add1: user?.address,
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: user?.number,
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  // console.log(data,'Data');

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then(async (apiResponse) => {
    // console.log(apiResponse);
    const GatewayPageURL = apiResponse.GatewayPageURL;
    // console.log(GatewayPageURL);
    // Save the order with product_id
    const newOrder = new orderModel({
      userName: user?.name,
      userEmail: user?.email,
      userPhone: user?.number,
      tran_id: tran_id,
      productIds: [...user?.productIds],
      product_name: singleProduct?.giftName,
      product_brand: singleProduct?.brand,
      product_image: singleProduct?.giftImage || [],
      total_amount: user.total,
      payment_status: "Pending",
      order_status: "Pending",
      review: {
        rating: null,
        comment: null,
        tran_id: null,
        ReviewerName: null,
        ReviewerProfileImage: null,
        reviewedAt: null,
      },
      wrap: user.wrap,
      message: user.message,
      scheduleDate: user?.scheduleDate ? user.scheduleDate : "",
      isShedule: user?.scheduleDate ? true : false,
    });

    // console.log(newOrder, 'New order details ');

    const saveGift = await newOrder.save();
    console.log('save order',saveGift);

    // console.log(singleProduct?.brand, 'Product Brand');
    // console.log(newOrder.product_brand, 'New Order Product Brand');

    res.send({
      url: GatewayPageURL,
    });
    // console.log('Redirecting to:', GatewayPageURL);
  });
};

module.exports = order;
