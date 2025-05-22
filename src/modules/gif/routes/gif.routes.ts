import { RequestHandler, Router } from "express";
import * as controller from "../controllers/gif.controller";

const router = Router();

router.get("/", controller.getGif as RequestHandler);

export default router;
