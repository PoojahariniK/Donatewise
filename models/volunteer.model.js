const db = require("../config/db");

const VolunteerModel = {
  create: (payload) => {
    const sql = `INSERT INTO volunteer_events
      (ngo_id, event_name, category, description, total_volunteers, event_date, location, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      payload.ngo_id,
      payload.event_name,
      payload.category,
      payload.description,
      payload.total_volunteers,
      payload.event_date,
      payload.location,
      payload.status || "Open"
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
      db.query("SELECT * FROM volunteer_events WHERE ngo_id = ?", [ngo_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = VolunteerModel;
