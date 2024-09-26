const payment = (req, res) => {
    console.log("Payment route hit");

    res.send('Payment route hit successfully');
};

module.exports = payment;
