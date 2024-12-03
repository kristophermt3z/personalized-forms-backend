import { Router } from "express";
import { helloWorld } from "./controller/hwlloWorld.controller";

const router = Router();

export const routes = () => {
  router.get("/helloWorld", helloWorld);
};
export default router;
