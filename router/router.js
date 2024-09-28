const express = require("express");
const payment = require("../controller/payment")
const router = express.Router();

const uploadGift = require("../controller/uploadGift");
const getAllGift = require("../controller/getAllGift");
const getAGift = require("../controller/getAGift");
const {getAllMessage } = require("../controller/chatController");
const { createUser, getUsers, getSingleUser } = require("../controller/userController");

// chat app route
// router.get("/messages", getMessages);
// router.post("/messages", createMessage);


// Routes
router.post("/uploadGift", uploadGift);
router.get("/getAllGift", getAllGift);
router.post("/payment", payment);
router.get("/:id", getAGift);

// user

router.post("/user/createUser", createUser)
router.get("/user/getUsers", getUsers)
router.get("/user/getUser/:email", getSingleUser)
router.get("/chat/getChats", getAllMessage)

module.exports = router;
