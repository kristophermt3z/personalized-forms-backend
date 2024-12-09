import { Request, Response } from "express";
import Form from "../models/Forms";

export const createForm = async (req: Request, res: Response) => {
  try {
    const { title, description, fields, authorId } = req.body;

    if (!title || !description || !fields || !authorId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newForm = new Form({ title, description, fields, authorId });
    await newForm.save();

    res.status(201).json({ message: "Form created successfully.", form: newForm });
  } catch (error) {
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