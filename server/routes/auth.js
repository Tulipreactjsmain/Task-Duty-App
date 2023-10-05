import express from "express";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  logoutUser,
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
router.get("/user", requireAuth);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
