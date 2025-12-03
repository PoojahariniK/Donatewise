const bcrypt = require("bcrypt");
const LoginModel = require("../models/login.model");

const LoginService = {
  login: async (email, password) => {
    // email validation
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await LoginModel.findByEmail(email);

    if (!user) {
      throw new Error("No account found with this email");
    }

    // Compare password with hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    return { message: "Login success", user };
  },
};

module.exports = LoginService;
