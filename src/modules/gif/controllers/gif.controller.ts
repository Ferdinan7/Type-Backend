import { Request, Response } from "express";
import { getGifs } from "../services/gif.service";

export const getGif = async (req: Request, res: Response) => {
  const tag = req.query.tag as string || "celebration";
  const gifUrl = await getGifs();

  if (!gifUrl) {
    return res.status(404).json({ error: "No se encontro un gif" });
  }

  res.json({ gif: gifUrl})
}
