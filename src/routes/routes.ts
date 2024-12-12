import { Router } from "express";
import { helloWorld } from "../controller/helloWorld.controller";
import { login, register } from "../controller/auth.controller";
import { createForm, getForms } from "../controller/form.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/helloWorld", helloWorld);
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/forms/create-form", authenticate, createForm);
router.get("/forms/get-forms", authenticate, getForms);

export default router;
