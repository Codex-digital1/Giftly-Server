const express = require("express");
const router = express.Router()

const uploadGift = require("../controller/uploadGift");
const getAllGift = require("../controller/getAllGift");
const getAGift = require("../controller/getAGift");
router.post("/uploadGift", uploadGift)
router.get("/getAllGift", getAllGift)
router.get("/getSingleGiftDetails/:id", getAGift) 


module.exports = router;