const express = require("express");
const router = express.Router();

const uploadGift = require("../controller/uploadGift");
const getAllGift = require("../controller/getAllGift");
const getAGift = require("../controller/getAGift");
const order = require("../controller/order")
const updateAGift = require("../controller/updateAGift");
const deleteAGift = require("../controller/deleteAGift");
const userCreate = require("../controller/userCreate");
const getAUser = require('../controller/getAUser')
const {getAllMessage } = require("../controller/chatController");
const {getUsers, getSingleUser, updateReceiver, getReceiverData } = require("../controller/GetUsersController");
const {
  orderManage,
  updateOrderStatus,
  getSpecificUserOrdersList,
} = require("../controller/orderManageControllers");

// Routes
router.post("/users", userCreate);
router.get("/getAUser/:email", getAUser);
router.post("/uploadGift", uploadGift);
router.get("/getAllGift", getAllGift);

// user
router.get("/all-orders", orderManage);
router.get("/user-orders/:email", getSpecificUserOrdersList);
router.patch("/order-status-update/:id", updateOrderStatus);
router.get("/:giftId", getAGift);
router.post("/order", order);
router.get("/:id", getAGift);
router.put("/:giftId", updateAGift);
router.delete("/:giftId", deleteAGift);

// chat feature
router.get("/chat/getChats", getAllMessage)
router.get("/user/getUsers", getUsers)
router.get("/user/getUser/:email", getSingleUser)
router.put("/user/updateReceiver/:id", updateReceiver)
router.get("/user/getReceiver/:receiverName", getReceiverData)

module.exports = router;
