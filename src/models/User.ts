import mongoose, { Schema, Document } from "mongoose";
import Form from "./Forms";
import Reply from "./Reply";
import cloudinary from "../config/cloudinary";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  admin: boolean;
  active: boolean;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
  active: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const userId = this._id;

    try {
      const forms = await Form.find({ authorId: userId });
      for (const form of forms) {
        // Delete all replies related to the user's forms
        await Reply.deleteMany({ formId: form._id });
        if (form.image) {
          const publicId = form.image.split("/").pop()?.split(".")[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`forms/${publicId}`);
          }
        }
      }
      // Delete all forms created by the user
      await Form.deleteMany({ authorId: userId });

      // Delete all replies made by the user
      await Reply.deleteMany({ userId });
      next();
    } catch (error: any) {
      next(error);
    }
  }
);

export default mongoose.model<IUser>("User", UserSchema);
