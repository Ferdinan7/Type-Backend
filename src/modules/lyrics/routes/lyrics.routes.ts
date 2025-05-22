import { Router } from "express";
import { getLocalLyric } from "../controllers/lyrics.controller";

const router = Router();

router.get("/", getLocalLyric);

export default router;
