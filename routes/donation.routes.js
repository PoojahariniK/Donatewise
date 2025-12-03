const express = require("express");
const router = express.Router();
const DonationController = require("../controllers/donation.controller");

// POST /api/donation-requests
router.post("/donation-requests", DonationController.create);

// GET /api/donation-requests/ngo/:ngoId
router.get("/donation-requests/ngo/:ngoId", DonationController.listByNgo);

module.exports = router;
