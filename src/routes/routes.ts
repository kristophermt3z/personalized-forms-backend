import { Router } from "express";
import { helloWorld } from "../controller/hwlloWorld.controller";

const router = Router();

router.get("/helloWorld", helloWorld);

export default router;
