const db = require("../config/db");

const LoginModel = {
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM join_requests WHERE email = ?",
        [email],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]); // return first row
        }
      );
    });
  }
};

module.exports = LoginModel;
