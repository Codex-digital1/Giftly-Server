const express = require("express");
const router = express.Router()

const uploadGift = require("../controller/uploadGift");

router.post("/item", uploadGift)


module.exports = router;