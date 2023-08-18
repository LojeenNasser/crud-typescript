import express from "express";
import auth from "../middleware/auth";
import {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/TaskController";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", auth, createTask);
router.get("/:id", getTaskById);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
