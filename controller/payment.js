const SSLCommerzPayment = require("sslcommerz-lts");
const mongoose = require("mongoose");
const giftModel = require("../model/giftModelSchema");
 
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; // true for live, false for sandbox

const payment = async (req, res) => {
    const user = req.body;
console.log(user);
    // Get product by ID for better security
    const singleProduct = await giftModel.findById(user?.productId);
    const tran_id = new mongoose.Types.ObjectId().toString();

    const data = {
        total_amount: singleProduct?.price,
        currency: 'BDT',
        tran_id: tran_id, // Use unique tran_id for each API call
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

    console.log(data);
    
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to the payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });
        console.log('Redirecting to:', GatewayPageURL);
    });




    
};

module.exports = payment;
