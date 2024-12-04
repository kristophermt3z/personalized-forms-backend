import { Router } from "express";
import { helloWorld } from "../controller/hwlloWorld.controller";
import { login, register } from "../controller/auth.controller";

const router = Router();

router.get("/helloWorld", helloWorld);
router.post("/register", register);
router.post("/login", login);

export default router;
