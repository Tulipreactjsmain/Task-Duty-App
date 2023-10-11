import User from "../models/auth.js";
import bcrypt from "bcrypt";
import { customError } from "../config/error.js";
import sendResetPasswordEmail from "../config/email.js";
import { generateRandomToken } from "../config/token.js";

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
        "https://res.cloudinary.com/techbro/image/upload/v1696705659/Task%20Duty/userDefault_IMG_bkhzne.jpg",
    });

    const user = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profileImg: newUser.profileImg,
      createdAt: newUser.createdAt,
    };

    req.session.user = user;
    res.status(201).json({ user, msg: "User registration successfull" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const isUser = await User.findOne({ username });
    if (!isUser) {
      return next(
        customError(404, "User with the provided username not found.")
      );
    }
    const passwordMatch = await bcrypt.compare(password, isUser.password);
    if (!passwordMatch) {
      return next(customError(401, "Incorrect password. Please try again."));
    }

    const user = {
      _id: isUser._id,
      username: isUser.username,
      email: isUser.email,
      profileImg: isUser.profileImg,
      createdAt: isUser.createdAt,
    };
    req.session.user = user;
    res.status(200).json({ user, msg: "User login successful" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  const { username, email, password, profileImg } = req.body.profile;
  try {
    const userId = req.session.user._id;
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
      _id: { $ne: userId },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User with the same email or username already exists.",
      });
    }

    const updateObject = {
      username: username || req.session.user.username,
      email: email || req.session.user.email,
      profileImg: profileImg || req.session.user.profileImg,
      ...(password && {
        password: await bcrypt.hash(password, 10),
      }),
    };
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateObject },
      { new: true }
    );

  
    if (updatedUser) {
      const user = {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        profileImg: updatedUser.profileImg,
      };
      req.session.user = user;

      res.status(201).json({ user, msg: "User profile updated" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.header("Access-Control-Allow-Credentials", true);
    res.clearCookie("TaskDuty.cookie", { path: "/" });
    res.status(200).json({ msg: "User logged out successfully" });
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const resetToken = generateRandomToken(16);
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    const resetPasswordURL = process.env.RESET_PASSWORD_URL;
    const existingUser = await User.findOneAndUpdate(
      { email },
      { resetToken, resetTokenExpiry },
      { new: true }
    );
    if (!existingUser) {
      return res.status(404).json({ error: `User with ${email} not found ` });
    }
    const resetLink = `${resetPasswordURL}?token=${resetToken}`;
    sendResetPasswordEmail(email, resetLink);

    res.status(200).json({ message: "Reset instructions sent to your email" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
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
