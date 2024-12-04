import { Router } from "express";
import { helloWorld } from "../controller/hwlloWorld.controller";
import { login, register } from "../controller/auth.controller";

const router = Router();

router.get("/helloWorld", helloWorld);
router.post("/auth/register", register);
router.post("/auth/login", login);

export default router;