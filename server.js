require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

const joinRequestRoutes = require("./routes/joinRequests.routes");
const loginRoutes = require("./routes/login.routes");
const volunteerRoutes = require("./routes/volunteer.routes");
const donationRoutes = require("./routes/donation.routes");
const logoutRoutes = require("./routes/logout.routes");  // ✅ FIXED

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

const PORT = 5000;

/* PUBLIC ROUTES */
app.use("/api", joinRequestRoutes);
app.use("/api", loginRoutes);
app.use("/api", logoutRoutes);   //  LOGOUT MUST BE PUBLIC

/* PROTECTED ROUTES */
app.use("/api", auth, volunteerRoutes);
app.use("/api", auth, donationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
