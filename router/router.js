const express = require("express");
const router = express.Router()

const uploadGift = require("../controller/uploadGift");
const getAllGift = require("../controller/getAllGift");
const getAGift = require("../controller/getAGift");
const updateAGift = require("../controller/updateAGift");
const deleteAGift = require("../controller/deleteAGift");
const userCreate = require("../controller/userCreate");

router.post("/uploadGift", uploadGift)
router.post("/users", userCreate)
router.get("/getAllGift", getAllGift)
router.get("/:giftId", getAGift) 
router.put("/:giftId", updateAGift) 
router.delete("/:giftId", deleteAGift) 


module.exports = router;