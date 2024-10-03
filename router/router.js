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


// Routes
router.post("/users", userCreate);
router.get('/getAUser/:email', getAUser)
router.post("/uploadGift", uploadGift);
router.get("/getAllGift", getAllGift);
router.get("/:giftId", getAGift) 
router.post("/order", order);  
router.get("/:id", getAGift); 
router.put("/:giftId", updateAGift) 
router.delete("/:giftId", deleteAGift) 

module.exports = router;
