const VolunteerService = require("../services/volunteer.service");

const VolunteerController = {
  create: async (req, res) => {
    try {
      // Expect frontend to send ngo_id (from logged-in user)
      const payload = req.body;
      const created = await VolunteerService.createVolunteerEvent(payload);
      res.status(201).json({ message: "Volunteer event created", event: created });
    } catch (err) {
      console.error("Volunteer create error:", err);
      res.status(400).json({ message: err.message });
    }
  },

  listByNgo: async (req, res) => {
    try {
      const ngo_id = req.params.ngoId;
      const events = await VolunteerService.listByNgo(ngo_id);
      res.json({ events });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

module.exports = VolunteerController;
