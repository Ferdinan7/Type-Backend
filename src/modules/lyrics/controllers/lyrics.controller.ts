import { Request, Response } from "express";
import { getRandomLocalLyric } from "../services/localLyrics.service";

export const getLocalLyric = (req: Request, res: Response) => {
  const genre = req.query.genre as string || "pop";

  const result = getRandomLocalLyric(genre);
  res.json(result);
}
