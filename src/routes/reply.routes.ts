import { Router } from "express";
import { getRepliesByForm, submitReply } from "../controller/reply.controller";
import { authenticate } from "../middlewares/auth.middleware";

const replyRouter = Router();

replyRouter.post("/reply", authenticate, submitReply);
replyRouter.get("/reply/:formId", authenticate, getRepliesByForm);

export default replyRouter;
