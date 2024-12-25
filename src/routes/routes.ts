import { Router } from "express";
import { getCurrentUser, login, register } from "../controller/auth.controller";
import {
  createForm,
  deleteForm,
  fetchProfileForms,
  getFormById,
  getForms,
  updateForm,
} from "../controller/form.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { deleteUser, getAllUsers, updateUser } from "../controller/admin.controller";
import { isAdmin } from "../middlewares/admin.middleware";

const router = Router();
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", authenticate, getCurrentUser);

router.post("/forms/create-form", authenticate, createForm);
router.get("/forms/get-forms", getForms);
router.get("/forms/get-profile-forms", authenticate, fetchProfileForms);
router.get("/forms/:id", authenticate, getFormById);
router.put("/forms/:id", authenticate, updateForm);
router.delete("/forms/:id", deleteForm);

router.get("/admin/users", authenticate, isAdmin, getAllUsers);
router.put("/admin/users/:id", authenticate, isAdmin, updateUser);
router.delete("/admin/users/:id", authenticate, isAdmin, deleteUser);

export default router;
