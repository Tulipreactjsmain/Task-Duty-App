import User from "../models/auth.js";
import bcrypt from "bcrypt";
import { customError } from "../config/error.js";
import sendResetPasswordEmail from "./email.js";
import generateToken, { generateRandomToken } from "../config/token.js";

export const registerUser = async (req, res, next) => {
  res.status(200);
  const { username, email, password, profileImg } = req.body;
  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return next(
        customError(404, "User with the same email or username already exists.")
      );
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: passwordHash,
      profileImg:
        profileImg ||
        "https://res.cloudinary.com/techbro/image/upload/v1695821188/user-profile-icon-free-vector_jqofee.jpg",
    });

    const user = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profileImg: newUser.profileImg,
    };
    const access_token = generateToken(user._id);
    res
      .status(201)
      .json({ access_token, user, msg: "User registration successfull" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return next(
        customError(404, "User with the provided username not found.")
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(customError(401, "Incorrect password. Please try again."));
    }
    const accessToken = generateToken(user._id);
    res.status(200).json({ accessToken, user, msg: "User login successful" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const resetToken = generateRandomToken(16);
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    console.log(resetTokenExpiry);

    const existingUser = await User.findOneAndUpdate(
      { email },
      { resetToken, resetTokenExpiry },
      { new: true }
    );
    if (!existingUser) {
      return res.status(404).json({ error: `User with ${email} not found ` });
    }

    const frontendResetPasswordURL =
      "https://res.cloudinary.com/techbro/image/upload/v1694393440/cld-sample-3.jpg";
    const resetLink = `${frontendResetPasswordURL}?token=${resetToken}`;
    sendResetPasswordEmail(email, resetLink);

    res.status(200).json({ message: "Reset instructions sent to your email" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({ resetToken: token });

    if (!user || user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.password = passwordHash;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
