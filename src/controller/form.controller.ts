import { Request, Response } from "express";
import Form from "../models/Forms";

export const createForm = async (req: Request, res: Response) => {
  try {
    const { title, description, fields } = req.body;
    const user = req.user; // Extracted from middleware (token)

    if (!title || !description || !fields || !user) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newForm = new Form({ title, description, fields, authorId: user.id });
    await newForm.save();

    res
      .status(201)
      .json({ message: "Form created successfully.", form: newForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating form.", error });
  }
};

export const getForms = async (req: Request, res: Response) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms.", error });
  }
};

export const getFormById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    
    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ message: "Error fetching form.", error });
  }
};

export const updateForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, fields } = req.body;

    if (!title || !description || !fields) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { title, description, fields },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({ message: "Form updated successfully.", form: updatedForm });
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ message: "Error updating form.", error });
  }
};