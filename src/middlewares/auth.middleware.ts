import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.error("No token provided.");
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const user = jwt.verify(token, jwtSecret);
    console.log("Authenticated user:", user); // Depuración
    req.user = user;
    next();
  } catch (err) {
    console.error("Invalid token:", err);
    res.status(400).json({ message: "Invalid token." });
  }
};

