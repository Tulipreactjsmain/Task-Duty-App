import express from "express";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.js";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile ", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { 
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);
router.get("/dashboard", (req, res) => {
  res.json({ user: req.user });
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
