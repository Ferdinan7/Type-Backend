
// task.routes.ts - Versión corregida
import { Router } from "express";
import * as controller from "../controllers/task.controller";
import { authGuard } from "@shared/middlewares/authGuard";

const router = Router();

// Como los controladores ya están envueltos con asyncHandler en su definición,
// no necesitamos envolverlos nuevamente aquí
router.get("/", authGuard(), controller.getAll);
router.get("/:id", authGuard(), controller.getById);
router.post("/", authGuard(true), controller.create);
router.put("/:id", authGuard(true), controller.update);
router.delete("/:id", authGuard(true), controller.remove);

// Si tienes la ruta para updateStatus, también la añadimos
// router.patch("/:id/status", authGuard(true), controller.updateStatus);

export default router;
