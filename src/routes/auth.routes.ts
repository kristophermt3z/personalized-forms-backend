import { Router } from "express";
import { getCurrentUser, login, register } from "../controller/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/auth/register", register);
authRouter.post("/auth/login", login);
authRouter.get("/auth/me", authenticate, getCurrentUser);

export default authRouter;
