import { Request, Response } from "express";
import Joi from "joi";
import * as taskService from "../services/TaskService";

interface TaskSchema {
  taskTitle?: string; 
  taskName: string; 
  taskStartDate: string; 
  taskEndDate: string; 
  taskBody?: string; 
  taskImage?: string; 
}

const taskSchema = Joi.object<TaskSchema>({
  taskTitle: Joi.string(),
  taskName: Joi.string().required(),
  taskStartDate: Joi.date().iso().required(),
  taskEndDate: Joi.date().iso().required(),
  taskBody: Joi.string(),
  taskImage: Joi.string(),
}).options({ abortEarly: false }); 


const respondWithError = (res: Response, statusCode: number, message: string) => {
  return res.status(statusCode).json({ error: message });
};

const respondWithSuccess = (res: Response, data: any) => {
  return res.json({ data, status: "success" });
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTasks();
    return respondWithSuccess(res, tasks);
  } catch (error: unknown) {
    return respondWithError(res, 500, (error as Error).message);
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) {
      return respondWithError(res, 400, error.details[0].message);
    }

    const task = await taskService.createTask(req.body);
    return respondWithSuccess(res, task);
  } catch (error: unknown) {
    return respondWithError(res, 500, (error as Error).message);
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    return respondWithSuccess(res, task);
  } catch (error: unknown) {
    return respondWithError(res, 500, (error as Error).message);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) {
      return respondWithError(res, 400, error.details[0].message);
    }

    const task = await taskService.updateTask(req.params.id, req.body);
    return respondWithSuccess(res, task);
  } catch (error: unknown) {
    return respondWithError(res, 500, (error as Error).message);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    return respondWithSuccess(res, task);
  } catch (error: unknown) {
    return respondWithError(res, 500, (error as Error).message);
  }
};
