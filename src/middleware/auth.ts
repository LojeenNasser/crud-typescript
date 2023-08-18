import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  interface Request {
    user?: string;
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined in environment variables");
    }

    const decoded = jwt.verify(token, jwtSecret) as { id: string };
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
