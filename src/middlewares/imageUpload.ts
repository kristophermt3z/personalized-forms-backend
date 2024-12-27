import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary";

type CustomParams = {
  folder?: string;
  allowed_formats?: string[];
  transformation?: object[];
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "forms",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  } as CustomParams,
});

export const upload = multer({ storage });
