const JoinRequestModel = require("../models/joinRequests.model");
const bcrypt = require("bcrypt");

const JoinRequestService = {
  createJoinRequest: async (data) => {
    // 1. REQUIRED FIELDS
    const required = [
      "full_name",
      "email",
      "phone_number",
      "address",
      "city_state",
      "join_type",
    ];

    for (const f of required) {
      if (!data[f] || data[f].toString().trim() === "") {
        throw new Error(`${f.replace("_", " ")} is required`);
      }
    }

    // 2. EMAIL FORMAT
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Invalid email format");
    }

    // 3. UNIQUE EMAIL
    const existing = await JoinRequestModel.findByEmail(data.email);
    if (existing) throw new Error("Email already registered");

    // 4. JOIN TYPE VALIDATION
    const validRoles = ["Donor", "Volunteer", "NGO"];
    if (!validRoles.includes(data.join_type)) {
      throw new Error("Invalid join type");
    }

    // 5. NGO AUTO-VERIFICATION
    if (data.join_type === "NGO") {
      if (!data.ngo_name || !data.registration_number) {
        throw new Error("NGO name and registration number are required");
      }

      const verifiedNGO = await JoinRequestModel.findVerifiedNGO(
        data.ngo_name,
        data.registration_number
      );

      // auto-verify result
      data.is_verified = !!verifiedNGO;

      if (!verifiedNGO) {
        throw new Error("❌ NGO not found in pre-verified database");
      }
    }

    // 6. PASSWORD VALIDATION
    if (!data.password) throw new Error("Password is required");

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(data.password)) {
      throw new Error(
        "Password must be 8+ chars, include upper, lower, number & special char"
      );
    }

    // 7. HASH PASSWORD
    data.password = await bcrypt.hash(data.password, 10);

    // 8. SAVE DATA
    return await JoinRequestModel.create(data);
  },

  // Optional (not required, but useful if you want API endpoint later)
  verifyNGO: async (ngo_name, registration_number) => {
    return await JoinRequestModel.findVerifiedNGO(
      ngo_name,
      registration_number
    );
  },
};

module.exports = JoinRequestService;
