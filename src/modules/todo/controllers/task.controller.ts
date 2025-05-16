import * as service from "../services/task.service";
import { asyncHandler } from "@utils/asyncHandler";
import { taskSchema, partialTaskSchema, statusEnum } from "../validators/task.schema";
import { taskIdSchema } from "../validators/task.schema";

// Obtener todas las tareas
export const getAll = asyncHandler(async (req, res) => {
  const statusQuery = req.query.status;

  let status;
  if (statusQuery && statusEnum.safeParse(statusQuery).success) {
    status = statusQuery as "ASSIGNED" | "TODO" | "COMPLETED";
  }

  const tasks = await service.getAllTasks(status);
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
  const task = await service.createTask(data);
  res.status(201).json(task);
});

// Actualizar una tarea
export const update = asyncHandler(async (req, res) => {
  const { id } = taskIdSchema.parse(req.params);
  const data = partialTaskSchema.parse(req.body);
  const task = await service.updateTask(Number(id), data);
  res.status(202).json(task);
});

// Eliminar una tarea
export const remove = asyncHandler(async (req, res) => {
  const { id } = taskIdSchema.parse(req.params);
  await service.deleteTask(Number(id));
  res.status(204).send();
});

//Actualizar el estado de una tarea
export const updateStatus = asyncHandler(async (req, res) => {
  const { id } = taskIdSchema.parse(req.params);
  const status = statusEnum.parse(req.body);
  const task = await service.updateTaskStatus(Number(id), status);
  res.status(202).json(task);
});
