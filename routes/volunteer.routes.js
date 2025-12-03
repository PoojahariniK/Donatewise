const express = require("express");
const router = express.Router();
const VolunteerController = require("../controllers/volunteer.controller");

// POST /api/volunteer-events
router.post("/volunteer-events", VolunteerController.create);

// GET /api/volunteer-events/ngo/:ngoId
router.get("/volunteer-events/ngo/:ngoId", VolunteerController.listByNgo);

module.exports = router;
