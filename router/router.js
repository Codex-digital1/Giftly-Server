const express = require("express");
const router = express.Router()

const uploadGift = require("../controller/uploadGift");
const getAllGift = require("../controller/getAllGift");
const getAGift = require("../controller/getAGift");
const { getMessages, createMessage } = require("../controller/chatController");
router.post("/uploadGift", uploadGift)
router.get("/getAllGift", getAllGift)
router.get("/getSingleGiftDetails/:id", getAGift) 


router.get("/messages", getMessages);
router.post("/messages", createMessage);

module.exports = router;