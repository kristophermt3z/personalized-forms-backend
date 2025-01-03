import mongoose, { Schema, Document } from "mongoose";

export interface IReply extends Document {
  formId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  responses: { fieldId: string; answer: string }[];
  createdAt: Date;
}

const ReplySchema: Schema = new Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Forms", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  responses: [
    {
      fieldId: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReply>("Reply", ReplySchema);
