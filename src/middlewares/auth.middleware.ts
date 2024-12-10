import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.error("No token provided.");
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token using utils/jwt.ts
    const user = verifyToken(token);
    console.log("Authenticated user:", user); // Debugging
    req.user = user; // Attach decoded user to request
    next();
  } catch (err) {
    console.error("Invalid token:", err);
    res.status(400).json({ message: "Invalid token." });
  }
};
