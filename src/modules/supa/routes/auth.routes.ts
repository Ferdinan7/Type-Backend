import { RequestHandler, Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/register", authController.register as RequestHandler);
router.post("/login", authController.login as RequestHandler);
router.get("/google", authController.loginWithGoogle as RequestHandler);
router.get("/session", authController.validateSession as RequestHandler)
router.post("resend-verification", authController.resendVerificationEmail as RequestHandler)
router.post("/logout", authController.logout as RequestHandler)

export default router;
