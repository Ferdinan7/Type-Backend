// src\index.ts
//Dependencias
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Rutas
import taskRoutes from "./modules/todo/routes/task.routes";
import authRoutes from "./modules/supa/routes/auth.routes";
import gifRoutes from "./modules/gif/routes/gif.routes";
import boredRoutes from "./modules/bored/routes/bored.routes";
import lyricsRoutes from "./modules/lyrics/routes/lyrics.routes";

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
app.use("/gif", gifRoutes)
app.use("/bored", boredRoutes)
app.use("/lyrics", lyricsRoutes)

//Middlewares
app.use(errorHandler);

export default app;
