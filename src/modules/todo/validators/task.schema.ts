import { z } from "zod";

export const statusEnum = z.enum(["ASSIGNED", "TODO", "COMPLETED"])

export const taskSchema = z.object({
  title: z.string().min(1, "El titulo es obligatorio"),
  description: z.string().optional(),
  status: statusEnum.optional(),
  completed: z.boolean().optional()
});

export const partialTaskSchema = taskSchema.partial();

export const taskIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "El ID debe ser un número entero válido"),
});
