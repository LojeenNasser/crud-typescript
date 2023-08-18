import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRouter from "./routes/TaskRoutes"; 
import userRouter from "./routes/UserRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/tasks", taskRouter);
app.use("/auth", userRouter);

// Connect to mongodb and start server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error starting server:", error.message);
    } else {
      console.error("An unknown error occurred while starting the server.");
    }
  }
}

startServer();

export default app;
