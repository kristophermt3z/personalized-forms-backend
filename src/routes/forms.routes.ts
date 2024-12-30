import { Router } from "express";
import {
  createForm,
  deleteForm,
  fetchProfileForms,
  getFormById,
  getForms,
  updateForm,
} from "../controller/form.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/imageUpload";

const formsRouter = Router();

formsRouter.post("/forms/create-form", authenticate, upload.single("image"), createForm);
formsRouter.get("/forms/get-forms", getForms);
formsRouter.get("/forms/get-profile-forms", authenticate, fetchProfileForms);
formsRouter.get("/forms/:id", getFormById);
formsRouter.put("/forms/:id", authenticate, upload.single("image"), updateForm);
formsRouter.delete("/forms/:id", deleteForm);

export default formsRouter;
