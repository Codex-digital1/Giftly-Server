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
const { createUser, getUsers, getSingleUser } = require("../controller/userController");

// chat app route
// router.get("/messages", getMessages);
// router.post("/messages", createMessage);



// Routes
router.post("/users", userCreate)
router.post("/uploadGift", uploadGift);
router.get("/getAllGift", getAllGift);

// user
// router.post("/user/createUser", createUser)
// router.get("/user/getUsers", getUsers)
// router.get("/user/getUser/:email", getSingleUser)
// router.get("/chat/getChats", getAllMessage)
router.get("/:giftId", getAGift) 
router.post("/payment", payment);  
router.get("/:id", getAGift); 
router.put("/:giftId", updateAGift) 
router.delete("/:giftId", deleteAGift) 

module.exports = router;
