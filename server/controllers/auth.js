import User from "../models/auth.js";
import bcrypt from "bcrypt";
import { customError } from "../config/error.js";
import generateToken from "../config/token.js";

export const registerUser = async (req, res, next) => {
  const { username, email, password, profileImg } = req.body;
 
  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return next(
        customError(
          "409",
          "User with the same email or username already exists."
        )
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
