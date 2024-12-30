import { Router } from "express";
import { getRepliesByForm, submitReply } from "../controller/reply.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isOwnerOrAdmin } from "../middlewares/ownerOrAdmin.middleware";

const replyRouter = Router();

replyRouter.post("/reply", authenticate, submitReply);
replyRouter.get("/reply/:formId", authenticate, isOwnerOrAdmin, getRepliesByForm);

export default replyRouter;
