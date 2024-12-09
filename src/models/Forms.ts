import mongoose, { Schema, Document } from "mongoose";

interface IForm extends Document {
  title: string;
  description: string;
  fields: {
    id: string;
    type: string;
    label: string;
    required: boolean;
  }[];
  authorId: string;
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
  authorId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IForm>("Form", FormSchema);
