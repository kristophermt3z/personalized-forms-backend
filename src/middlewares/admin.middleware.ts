import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  try {
    const user = await User.findById(userId);
    if (!user || !user.admin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
