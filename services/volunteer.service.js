const VolunteerModel = require("../models/volunteer.model");
const JoinRequestsModel = require("../models/joinRequests.model");

const VolunteerService = {
  createVolunteerEvent: async (data) => {
    // Basic validations
    const required = ["ngo_id","event_name","category","description","total_volunteers","event_date","location"];
    for (const f of required) {
      if (!data[f]) throw new Error(`${f} is required`);
    }

    // Verify NGO exists and is NGO
    const ngo = await JoinRequestsModel.findById(data.ngo_id);
    if (!ngo) throw new Error("NGO not found");
    if (ngo.join_type !== "NGO") throw new Error("Only NGO users can post volunteer events");

    // Create
    const created = await VolunteerModel.create(data);
    return created;
  },

  listByNgo: async (ngo_id) => {
    return VolunteerModel.findByNgo(ngo_id);
  }
};

module.exports = VolunteerService;
