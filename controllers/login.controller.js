const LoginService = require("../services/login.service");

const LoginController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await LoginService.login(email, password);

      // Set JWT cookie
      res.cookie("jwt", result.token, {
        httpOnly: true,     // JS cannot read it
        secure: false,      // true in production (HTTPS)
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
      });

      res.status(200).json({
        message: "Login successful",
        user: {
          id: result.user.id,
          full_name: result.user.full_name,
          email: result.user.email,
          join_type: result.user.join_type,
        },
      });

    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

module.exports = LoginController;
