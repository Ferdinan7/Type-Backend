import prisma from "@shared/models/prisma";
import { TaskStatus } from '@prisma/client'

//Obtener todas las tareas a traves de Prisma
export const getAllTasks = (status?: TaskStatus) => {
  return prisma.task.findMany({
    where: status ? { status} : undefined,
  })
}

//Obtener una tarea por su ID
export const getTaskById = (id: number) =>
  prisma.task.findUnique({
    where: {id}
})

//Crear una nueva tarea
export const createTask = (data: {
  title: string;
  description?: string;
  status?: TaskStatus
}) => prisma.task.create({ data });

//Actualizar una tarea
export const updateTask = (id: number, data: any) => {
  console.log("➡️Datos recibidos para update: ", data)
  if (data.status === "COMPLETED") {
    data.completed = true;
  }
  return prisma.task.update({
    where: {id},
    data,
  })
}

//Eliminar una tarea
export const deleteTask = (id: number) =>
  prisma.task.delete({ where: { id } });

//Actualizar el estado de una tarea
export const updateTaskStatus = (id: number, status: TaskStatus) =>
  prisma.task.update({ data: { status }, where: { id } });

