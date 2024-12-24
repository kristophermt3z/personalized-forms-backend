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
    req.user = user; // Attach decoded user to request
    next();
  } catch (err: any) {
    console.error("Invalid token");

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired.", tokenExpired: true });
    }

    res.status(401).json({ message: "Invalid token.", tokenExpired: true });
  }
};
