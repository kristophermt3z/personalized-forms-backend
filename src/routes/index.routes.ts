import { Router } from "express";
import authRouter from "./auth.routes";
import formsRouter from "./forms.routes";
import replyRouter from "./reply.routes";
import adminRouter from "./admin.routes";

const router = Router();

// Combine all route files
router.use(authRouter);
router.use(formsRouter);
router.use(replyRouter);
router.use(adminRouter);

export default router;
