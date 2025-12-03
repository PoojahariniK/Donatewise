const express = require("express");
const app = express();
const cors = require("cors");

const joinRequestRoutes = require("./routes/joinRequests.routes"); 
const loginRoutes = require("./routes/login.routes");
const volunteerRoutes = require("./routes/volunteer.routes");
const donationRoutes = require("./routes/donation.routes");


app.use(express.json());
app.use(cors());
// Define the port
const PORT = 5000;


app.use("/api", joinRequestRoutes);

app.use("/api", loginRoutes);
app.use("/api", volunteerRoutes);
app.use("/api", donationRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});