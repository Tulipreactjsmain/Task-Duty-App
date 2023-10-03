import express from "express";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  logoutUser,
} from "../controllers/auth.js";
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
router.get("/dashboard", (req, res) => {
  res.json({ user: req.user });
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
