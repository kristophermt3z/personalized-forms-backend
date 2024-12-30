import { Request, Response } from "express";
import User from "../models/User";
import Form from "../models/Forms";
import cloudinary from "../config/cloudinary";
import mongoose from "mongoose";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users." });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User updated successfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user." });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Triggers the `pre` hook in the User model to handle deletion of related data
    await user.deleteOne(); 
    res.status(200).json({ message: "User and related data deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user." });
  }
};

