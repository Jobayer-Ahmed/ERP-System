const router = require("express").Router();
const authController = require("../controller/auth");

// GET to checksession
router.get("/users", authController.getUsers);
router.get("/check-session", authController.checkSession);

router.get("/logout", (req, res) => {
  req.logout();
  res.json(req.user);
});

// // POST to /register
router.post("/register", authController.registerUser);

// // POST to /login
router.post("/login", authController.loginUser);

// POST to /forget
router.post("/forget-password", authController.forgetPassword);

// POST to /forget with token
router.post("/reset/:token", authController.resetToken);

module.exports = router;
