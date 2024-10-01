const express = require("express");
const router = express.Router();

const uploadGift = require("../controller/uploadGift");
const getAllGift = require("../controller/getAllGift");
const getAGift = require("../controller/getAGift");
const payment = require("../controller/payment")
const updateAGift = require("../controller/updateAGift");
const deleteAGift = require("../controller/deleteAGift");
const userCreate = require("../controller/userCreate");
const getUser = require('../controller/getUser')


// Routes
router.post("/users", userCreate);
router.get('/getUser/:email', getUser)
router.post("/uploadGift", uploadGift);
router.get("/getAllGift", getAllGift);
router.get("/:giftId", getAGift) 
router.post("/payment", payment);  
router.get("/:id", getAGift); 
router.put("/:giftId", updateAGift) 
router.delete("/:giftId", deleteAGift) 

module.exports = router;
