import mongoose, { Schema, Document } from "mongoose";
import Reply from "./Reply";
import cloudinary from "../config/cloudinary";

interface IForm extends Document {
  title: string;
  description: string;
  fields: {
    id: string;
    type: string;
    label: string;
    required: boolean;
  }[];
  authorId: mongoose.Types.ObjectId;
  image: string;
  createdAt: Date;
}

const FormSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fields: [
    {
      id: { type: String, required: true },
      type: { type: String, required: true },
      label: { type: String, required: true },
      required: { type: Boolean, default: false },
    },
  ],
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

FormSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const formId = this._id;

    try {
      // Delete all replies related to this form
      await Reply.deleteMany({ formId });

      // Remove the associated image from Cloudinary if it exists
      const form = await mongoose.model<IForm>("Form").findById(formId);
      if (form && form.image) {
        const publicId = form.image.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`forms/${publicId}`);
        }
      }

      next();
    } catch (error: any) {
      next(error);
    }
  }
);

export default mongoose.model<IForm>("Form", FormSchema);
