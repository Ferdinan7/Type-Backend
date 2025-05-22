import { Request, Response } from "express";
import * as service from "../services/task.service";
import { asyncHandler } from "@shared/utils/asyncHandler";
import { taskSchema, partialTaskSchema, statusEnum, taskIdSchema } from "../validators/task.schema";
import { TaskStatus } from "@prisma/client";
import { getGifs } from "@modules/gif/services/gif.service";

// Obtener todas las tareas
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.sub;
  const statusQuery = req.query.status;

  let status: TaskStatus | undefined;

  if (statusQuery && statusEnum.safeParse(statusQuery).success) {
    status = statusQuery as TaskStatus;
  }

  const tasks = await service.getAllTasks(status, userId);
  res.status(200).json(tasks);
});

// Obtener una tarea por su ID
export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = taskIdSchema.parse(req.params);
  const task = await service.getTaskById(Number(id));

  if (!task) {
    res.status(404).json({ error: "Tarea no encontrada" });
    return;
  }

  res.status(200).json(task);
});

// Crear una nueva tarea
export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = taskSchema.parse(req.body);
  const task = await service.createTask({
    ...data,
    user_id: req.user!.sub,
  });
  res.status(201).json(task);
});

// Actualizar una tarea
export const update = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.user!.sub;

  const task = await service.getTaskById(id);

  if (!task || task.user_id !== userId) {
    res.status(403).json({ error: "No autorizado para modificar esta tarea" });
    return;
  }

  const data = partialTaskSchema.parse(req.body);
  const updated = await service.updateTask(id, data);

  let gif: string | null = null;

  if (updated.status === "COMPLETED") {
    gif = await getGifs("celebration");
  }

  res.status(202).json({ task: updated, gif});
});

// Eliminar una tarea
export const remove = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.user!.sub;

  const task = await service.getTaskById(id);

  if (!task || task.user_id !== userId) {
    res.status(403).json({ error: "No autorizado para eliminar esta tarea" });
    return;
  }

  await service.deleteTask(id);
  res.status(204).send();
});

//Actualizar el estado de una tarea
export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.user!.sub;
  const { status } = req.body

  if (!["ASSIGNED", "TODO", "COMPLETED"].includes(status)) {
    return res.status(400).json({ error: "Estado invalido"})
  }

  const task = await service.getTaskById(id);
  if (!task || task.user_id !== userId) {
    return res.status(403).json({ error: "No autorizado para modificar esta tarea" });
  }

  const updated = await service.updateTaskStatus(id, status);

  let gif: string | null = null;

  if (status === "COMPLETED") {
    gif = await getGifs("celebration");
  }

  res.status(202).json({ task: updated, gif});
});
