import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const generateRandomToken = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

export default generateToken;
