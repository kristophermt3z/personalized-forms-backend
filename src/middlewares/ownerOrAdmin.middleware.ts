import { Request, Response, NextFunction } from "express";
import Form from "../models/Forms";

export const isOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id; // Extracted from `authenticate` middleware
  let formId;

  if (req.params.id) {
    formId = req.params.id;
  }else if(req.params.formId){
    formId = req.params.formId;
  }

  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }

    // Check if user is the form's creator or an admin
    if (form.authorId.toString() !== userId && !req.user?.admin) {
      return res.status(403).json({ message: "Access denied. Not authorized." });
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
