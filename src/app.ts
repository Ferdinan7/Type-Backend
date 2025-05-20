// src\index.ts
//Dependencias
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Rutas
import taskRoutes from "./modules/todo/routes/task.routes";
import authRoutes from "./modules/supa/routes/auth.routes";

//Middlewares
import { errorHandler } from "./shared/middlewares/errorHandler";

// Initialize dotenv to load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

//Rutas
app.use("/tasks", taskRoutes)
app.use("/auth", authRoutes)

//Middlewares
app.use(errorHandler);

export default app;
