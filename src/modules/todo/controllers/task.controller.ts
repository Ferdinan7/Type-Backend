import { Request, Response } from "express";
import * as service from "../services/task.service";
import { asyncHandler } from "@utils/asyncHandler";
import { taskSchema, partialTaskSchema, statusEnum, taskIdSchema } from "../validators/task.schema";
import { TaskStatus } from "@prisma/client";

// Obtener todas las tareas
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.sub; // ← ya está validado por authGuard
  const statusQuery = req.query.status;

  let status: TaskStatus | undefined;

  if (statusQuery && statusEnum.safeParse(statusQuery).success) {
    status = statusQuery as TaskStatus;
  }

  const tasks = await service.getAllTasks(status, userId);
  res.status(200).json(tasks);
});

// Obtener una tarea por su ID
export const getById = asyncHandler(async (req, res) => {
  const { id } = taskIdSchema.parse(req.params);
  const task = await service.getTaskById(Number(id));

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.status(200).json(task);
});

// Crear una nueva tarea
export const create = asyncHandler(async (req, res) => {
  const data = taskSchema.parse(req.body);

  // Asignamos el user_id desde el JWT, requerido por RLS en Supabase
  const task = await service.createTask({
    ...data,
    user_id: req.user!.sub,
  });

  res.status(201).json(task);
});

// Actualizar una tarea
export const update = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const userId = req.user!.sub;

  // Validar si la tarea existe y pertenece al usuario
  const task = await service.getTaskById(id);

  if (!task || task.user_id !== userId) {
    return res.status(403).json({ error: "No autorizado para modificar esta tarea" });
  }

  const data = partialTaskSchema.parse(req.body);

  const updated = await service.updateTask(id, data);
  res.status(202).json(updated);
});

// Eliminar una tarea
export const remove = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const userId = req.user!.sub;

  // Validar si la tarea existe y pertenece al usuario
  const task = await service.getTaskById(id);

  if (!task || task.user_id !== userId) {
    return res.status(403).json({ error: "No autorizado para eliminar esta tarea" });
  }

  await service.deleteTask(id);
  res.status(204).send();
});

//Actualizar el estado de una tarea
export const updateStatus = asyncHandler(async (req, res) => {
  const { id } = taskIdSchema.parse(req.params);
  const status = statusEnum.parse(req.body);
  const task = await service.updateTaskStatus(Number(id), status);
  res.status(202).json(task);
});
