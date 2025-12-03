const DonationModel = require("../models/donation.model");
const JoinRequestsModel = require("../models/joinRequests.model");

const DonationService = {
  createDonationRequest: async (data) => {
    const required = [
      "ngo_id","for_whom","description","requirements","category","donation_type"
    ];
    
    for (const f of required) {
      if (!data[f]) throw new Error(`${f} is required`);
    }

    // verify NGO
    const ngo = await JoinRequestsModel.findById(data.ngo_id);
    if (!ngo) throw new Error("NGO not found");
    if (ngo.join_type !== "NGO") throw new Error("Only NGO users can post donation requests");

    // money validation
    if (data.donation_type === "money" || data.donation_type === "both") {
      if (!data.account_number) throw new Error("account_number is required for money donations");
      if (!data.ifsc_code) throw new Error("ifsc_code is required for money donations");
    }

    const created = await DonationModel.create(data);
    return created;
  },

  listByNgo: async (ngo_id) => {
    return DonationModel.findByNgo(ngo_id);
  }
};

module.exports = DonationService;
