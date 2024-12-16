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
