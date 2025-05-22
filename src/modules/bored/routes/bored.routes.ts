import { Router } from "express";
import { getActivity } from "../controllers/bored.controller";

const router = Router();

router.get("/", getActivity);

export default router;
