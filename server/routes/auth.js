import express from "express";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  updateUser,
} from "../controllers/auth.js";
import requireAuth from "../middlewares/requireAuth.js";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile ", "email"] })
);
router.get(
  "/google/taskduty",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
router.get("/user", requireAuth, (req, res) => {
  const user = req.session.user;
  res.header("Access-Control-Allow-Credentials", true);
  res.status(200).json({ user });
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/update", requireAuth, updateUser);
router.get("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
