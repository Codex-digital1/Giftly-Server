const express = require("express");
const router = express.Router();

const uploadGift = require("../controller/uploadGift");
const getAllGift = require("../controller/getAllGift");
const getAGift = require("../controller/getAGift");
const payment = require("../controller/payment")
const updateAGift = require("../controller/updateAGift");
const deleteAGift = require("../controller/deleteAGift");
const userCreate = require("../controller/userCreate");
const {getAllMessage } = require("../controller/chatController");
const {getUsers, getSingleUser, updateReceiver, getReceiverData } = require("../controller/GetUsersController");

// Routes
router.post("/users", userCreate)
router.post("/uploadGift", uploadGift);
router.get("/getAllGift", getAllGift);

// user
router.get("/:giftId", getAGift) 
router.post("/payment", payment);  
router.get("/:id", getAGift); 
router.put("/:giftId", updateAGift) 
router.delete("/:giftId", deleteAGift) 

// chat feature
router.get("/chat/getChats", getAllMessage)
router.get("/user/getUsers", getUsers)
router.get("/user/getUser/:email", getSingleUser)
router.put("/user/updateReceiver/:id", updateReceiver)
router.get("/user/getReceiver/:receiverName", getReceiverData)

module.exports = router;
