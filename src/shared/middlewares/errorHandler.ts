import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Error de validación",
      issues: err.errors,
    });
  }

  // Prisma: error de conexión o base caída
  if (
    err instanceof Prisma.PrismaClientInitializationError ||
    err instanceof Prisma.PrismaClientRustPanicError ||
    err.message?.includes("Can't reach database")
  ) {
    return res.status(503).json({
      error: "No se puede conectar a la base de datos. Intente más tarde.",
    });
  }

  res.status(500).json({
    error: "Error interno del servidor",
  });
};
