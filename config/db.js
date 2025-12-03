const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "27.Dec.2004", 
  database: "donatewise",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error(" Database connection failed:", err);
    return;
  }
  console.log(" Connected to MySQL database: donatewise");
});

module.exports = db;
