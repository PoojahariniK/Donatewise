const express = require("express");
const router = express.Router();
const JoinRequestController = require("../controllers/joinRequests.controller");

router.post("/join", JoinRequestController.createRequest);
router.post("/verify-ngo", JoinRequestController.verifyNGO);

module.exports = router;
