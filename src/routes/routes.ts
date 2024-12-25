import { Router } from "express";
import { login, register } from "../controller/auth.controller";
import {
  createForm,
  deleteForm,
  fetchProfileForms,
  getFormById,
  getForms,
  updateForm,
} from "../controller/form.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { getAllUsers } from "../controller/admin.controller";
import { isAdmin } from "../middlewares/admin.middleware";

const router = Router();
router.post("/auth/register", register);
router.post("/auth/login", login);

router.post("/forms/create-form", authenticate, createForm);
router.get("/forms/get-forms", getForms);
router.get("/forms/get-profile-forms", authenticate, fetchProfileForms);
router.get("/forms/:id", authenticate, getFormById);
router.put("/forms/:id", authenticate, updateForm);
router.delete("/forms/:id", deleteForm);

router.get("/admin/users", authenticate, isAdmin, getAllUsers);

export default router;
