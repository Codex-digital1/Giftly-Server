const express = require("express");
const router = express.Router();

const uploadGift = require("../controller/uploadGift");
const getAllGift = require("../controller/getAllGift");
const getAGift = require("../controller/getAGift");
const payment = require("../controller/payment");

// Routes
router.post("/uploadGift", uploadGift);
router.get("/getAllGift", getAllGift);
router.get("/payment", payment);  
router.get("/:id", getAGift); 

module.exports = router;
