import { Router } from "express";
import { helloWorld } from "./controller/hwlloWorld.controller";

export const routes = (router: Router) => {
  /* Exortos */
  router.get("/helloWorld", helloWorld);
};
