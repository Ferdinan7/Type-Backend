import { Request, Response } from "express"
import { getRandomActivity } from "../services/bored.service"

export const getActivity = async (_: Request, res: Response) => {
  try {
    const activity = await getRandomActivity();
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener una actividad"})
  }
}
