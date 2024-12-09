import { Router } from "express";
import { helloWorld } from "../controller/hwlloWorld.controller";
import { login, register } from "../controller/auth.controller";
import { createForm, getForms } from "../controller/form.controller";

const router = Router();

router.get("/helloWorld", helloWorld);
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/forms/create-form", createForm);
router.get("/forms/get-forms", getForms);

export default router;