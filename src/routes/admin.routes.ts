import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controller/admin.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";

const adminRouter = Router();

adminRouter.get("/admin/users", authenticate, isAdmin, getAllUsers);
adminRouter.put("/admin/users/:id", authenticate, isAdmin, updateUser);
adminRouter.delete("/admin/users/:id", authenticate, isAdmin, deleteUser);

export default adminRouter;
