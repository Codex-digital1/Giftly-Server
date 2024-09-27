const express = require("express");
const router = express.Router();

const uploadGift = require("../controller/uploadGift");
const getAllGift = require("../controller/getAllGift");
const getAGift = require("../controller/getAGift");
const { getMessages, createMessage } = require("../controller/chatController");

// chat app route
router.get("/messages", getMessages);
router.post("/messages", createMessage);


// Routes
router.post("/uploadGift", uploadGift);
router.get("/getAllGift", getAllGift);
router.post("/payment", payment);  
router.get("/:id", getAGift); 

const payment = require("../controller/payment")
module.exports = router;
