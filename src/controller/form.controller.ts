import { Request, Response } from "express";
import Form from "../models/Forms";
import cloudinary from "../config/cloudinary";

export const createForm = async (req: Request, res: Response) => {
  try {
    const { title, description, fields } = req.body;
    const user = req.user; // Extracted from middleware (token)

    if (!title || !description || !fields || !user) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    const pathImage = req.file.path;
    let parsedFields;
    try {
      parsedFields = JSON.parse(fields);
    } catch (error) {
      return res.status(400).json({ message: "Invalid fields format." });
    }

    const newForm = new Form({
      title,
      description,
      fields: parsedFields,
      authorId: user.id,
      image: pathImage,
    });
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
    const forms = await Form.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms.", error });
  }
};

export const fetchProfileForms = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const forms = await Form.find({ authorId: user.id }).sort({
      createdAt: -1,
    });
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

    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }

    let parsedFields;
    try {
      parsedFields = JSON.parse(fields);
    } catch (error) {
      return res.status(400).json({ message: "Invalid fields format." });
    }

    const updateData: any = {
      title,
      description,
      fields: parsedFields,
    };

    if (req.file && form.image) {
      const publicId = form.image.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`forms/${publicId}`);
      }
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedForm = await Form.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res
      .status(200)
      .json({ message: "Form updated successfully.", form: updatedForm });
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ message: "Error updating form.", error });
  }
};

export const deleteForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedForm = await Form.findByIdAndDelete(id);

    if (deletedForm) {
      const publicId = deletedForm.image.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`forms/${publicId}`);
      }
    }

    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found." });
    }

    res.status(200).json({ message: "Form deleted successfully." });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({ message: "Error deleting form.", error });
  }
};
