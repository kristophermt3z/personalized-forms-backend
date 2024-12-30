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
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find all forms created by the user
    const userId = new mongoose.Types.ObjectId(id);
    const forms = await Form.find({ authorId: userId });

    // Delete each form's image from Cloudinary
    for (const form of forms) {
      if (form.image) {
        const publicId = form.image.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`forms/${publicId}`);
        }
      }
    }

    // Delete all forms created by the user
    await Form.deleteMany({ authorId: userId });

    res
      .status(200)
      .json({ message: "User and associated forms deleted successfully." });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user." });
  }
};
