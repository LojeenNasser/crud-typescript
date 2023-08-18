import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user"; 
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({ email, password: hashedPassword });

    const token = generateToken(user._id);

    res.json({ message: "Registration successful", token });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({ message: "Login successful", token });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

function generateToken(userId: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not defined in environment variables");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}
