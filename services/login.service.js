const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const LoginModel = require("../models/login.model");

const LoginService = {
  login: async (email, password) => {
    if (!email || !password) throw new Error("Email and password are required");

    const user = await LoginModel.findByEmail(email);
    if (!user) throw new Error("No account found with this email");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Incorrect password");

    // Create JWT token
    const token = jwt.sign(
      { id: user.id,name:user.full_name,ngo:user.ngo_name, email: user.email, join_type: user.join_type },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );
    return { user, token };
  },
};

module.exports = LoginService;
