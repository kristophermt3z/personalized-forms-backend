import { Request, Response } from "express";
import Reply from "../models/Reply";

export const submitReply = async (req: Request, res: Response) => {
  try {
    const { formId, responses } = req.body;
    const user = req.user; 

    if (!formId || !responses || !user) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newReply = new Reply({
      formId,
      userId: user.id,
      responses,
    });

    await newReply.save();

    res.status(201).json({ message: "Reply submitted successfully.", reply: newReply });
  } catch (error) {
    console.error("Error submitting reply:", error);
    res.status(500).json({ message: "Error submitting reply.", error });
  }
};

export const getRepliesByForm = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const replies = await Reply.find({ formId }).sort({ createdAt: -1 });

    res.status(200).json(replies);
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ message: "Error fetching replies.", error });
  }
};
