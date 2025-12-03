const DonationService = require("../services/donation.service");

const DonationController = {
  create: async (req, res) => {
    try {
      const payload = req.body;
      const created = await DonationService.createDonationRequest(payload);
      res.status(201).json({ message: "Donation request created", donation: created });
    } catch (err) {
      console.error("Donation create error:", err);
      res.status(400).json({ message: err.message });
    }
  },

  listByNgo: async (req, res) => {
    try {
      const ngo_id = req.params.ngoId;
      const items = await DonationService.listByNgo(ngo_id);
      res.json({ donations: items });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

module.exports = DonationController;
