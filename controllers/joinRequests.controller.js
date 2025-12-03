const JoinRequestService = require("../services/joinRequests.service");

const JoinRequestController = {
  createRequest: async (req, res) => {
    try {
      const data = req.body;
      const result = await JoinRequestService.createJoinRequest(data);

      return res.status(201).json({
        message: "Join request created successfully!",
        id: result.insertId
      });

    } catch (err) {
      const badRequest =
        err.message.includes("required") ||
        err.message.includes("Invalid") ||
        err.message.includes("already");

      return res.status(badRequest ? 400 : 500).json({
        message: err.message,
      });
    }
  },

  // ⭐ NEW: verify NGO
  verifyNGO: async (req, res) => {
    try {
      const { ngo_name, registration_number } = req.body;

      if (!ngo_name || !registration_number) {
        return res.status(400).json({ message: "NGO name and registration number are required" });
      }

      const verified = await JoinRequestService.verifyNGO(ngo_name, registration_number);

      if (!verified) {
        return res.status(404).json({ message: "NGO not found in verified list" });
      }

      return res.status(200).json({
        message: "NGO verified successfully",
        data: verified
      });

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};

module.exports = JoinRequestController;
