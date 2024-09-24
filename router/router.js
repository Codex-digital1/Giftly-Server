const express = require("express");
const router = express.Router()

const uploadGift = require("../controller/uploadGift");
const getAllGift = require("../controller/getAllGift");

router.post("/uploadGift", uploadGift)
router.get("/getAllGift", getAllGift)


module.exports = router;