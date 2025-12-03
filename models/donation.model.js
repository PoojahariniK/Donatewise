const db = require("../config/db");

const DonationModel = {
  create: (payload) => {
    const sql = `INSERT INTO donation_requests
      (ngo_id, for_whom, description, requirements, category, status,
       donation_type, account_number, ifsc_code)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      payload.ngo_id,
      payload.for_whom,
      payload.description,
      payload.requirements,
      payload.category,
      payload.status || "Open",
      payload.donation_type,
      payload.account_number || null,
      payload.ifsc_code || null
    ];

    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId, ...payload });
      });
    });
  },

  findByNgo: (ngo_id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM donation_requests WHERE ngo_id = ?", [ngo_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = DonationModel;
