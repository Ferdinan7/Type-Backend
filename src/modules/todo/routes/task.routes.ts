// task.routes.ts - Versión corregida
import { Router } from "express";
import * as controller from "../controllers/task.controller";
import { authGuard } from "@shared/middlewares/authGuard";
import { requireEmailVerified } from "@shared/middlewares/requireEmailVerified";

const router = Router();

// Como los controladores ya están envueltos con asyncHandler en su definición,
// no necesitamos envolverlos nuevamente aquí
router.get("/", authGuard(), controller.getAll);
router.get("/:id", authGuard(), controller.getById);
router.post("/", authGuard(), requireEmailVerified, controller.create);
router.put("/:id", authGuard(), requireEmailVerified, controller.update);
router.delete("/:id", authGuard(), requireEmailVerified, controller.remove);
router.patch("/:id/status", authGuard(), requireEmailVerified, controller.updateStatus)

export default router;
