const SSLCommerzPayment = require("sslcommerz-lts");
const mongoose = require("mongoose");
const giftModel = require("../model/giftModelSchema");
const orderModel = require("../model/orderModelSchema");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; // true for live, false for sandbox

const order = async (req, res) => {
    const user = req.body;
 
    // Get product by ID for better security
    const singleProduct = await giftModel.findById(user?.productId);
console.log(singleProduct);
    if (!singleProduct) {
        return res.status(404).json({ message: "Product not found" });
    }
console.log(singleProduct);
    const tran_id = new mongoose.Types.ObjectId().toString();

    const data = {
        total_amount: singleProduct?.price,
        currency: 'BDT',
        tran_id: tran_id, // Unique transaction ID for each API call
        success_url: `http://localhost:3000/payment/success/${tran_id}`,
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: singleProduct?.name || 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: user?.name,
        cus_email: user?.email,
        cus_add1: user?.address,
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: user?.number,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };


    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then(async (apiResponse) => {
        const GatewayPageURL = apiResponse.GatewayPageURL;

        // Save the order with product_id
        const newOrder = new orderModel({
            userName:user?.name,
            userEmail:user?.email,
            userPhone:user?.number,
            tran_id: tran_id,
            productId: user?.productId,  
            product_name:singleProduct?.giftName,
            product_brand:singleProduct?.brand,
            product_image: singleProduct?.giftImage || [],             total_amount: singleProduct?.price,
            payment_status: 'Pending',
            order_status: 'Pending',
        });
        // console.log(newOrder, 'inside the payment ');

        const data = await newOrder.save();
        console.log(data, 'mongodb te save hoise ');

        res.send({ url: GatewayPageURL });
        console.log('Redirecting to:', GatewayPageURL);
    });
};

module.exports = order;
