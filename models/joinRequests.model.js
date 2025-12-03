const db = require("../config/db");

const JoinRequestModel = {
  // CREATE NEW JOIN REQUEST
  create: (data) => {
    const query = `
      INSERT INTO join_requests 
      (full_name, email, phone_number, address, city_state, join_type,
       contribution_type, ngo_name, registration_number, website,
       is_verified, areas_of_interest, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const values = [
      data.full_name,
      data.email,
      data.phone_number,
      data.address,
      data.city_state,
      data.join_type,
      data.contribution_type || null,
      data.ngo_name || null,
      data.registration_number || null,
      data.website || null,
      data.is_verified || false,
      data.areas_of_interest || null,
      data.password,
    ];

    return new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  // NEW: CHECK UNIQUE EMAIL
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM join_requests WHERE email = ? LIMIT 1",
        [email],
        (err, results) => {
          if (err) reject(err);
          else resolve(results[0]); // return single record
        }
      );
    });
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM join_requests WHERE id = ? LIMIT 1",
        [id],
        (err, results) => {
          if (err) reject(err);
          else resolve(results[0]);
        }
      );
    });
  },
  findVerifiedNGO: (ngo_name, registration_number) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM verified_ngos
        WHERE LOWER(name) = LOWER(?) 
        AND registration_number = ?
        LIMIT 1
      `;
      db.query(sql, [ngo_name, registration_number], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  },
  
};

module.exports = JoinRequestModel;
