import TaskModel from "../models/Task"; // Import TaskModel

interface ITask {
  _id: string;
  taskName: string;
  taskStartDate: Date;
  taskEndDate: Date;
  taskTitle?: string;
  taskBody?: string;
  taskImage?: string;
  createdAt: Date;
}

export const getAllTasks = async (): Promise<ITask[]> => {
  try {
    return await TaskModel.find();
  } catch (error: any) {
    throw new Error("Error fetching tasks: " + (error as Error).message);
  }
};

export const createTask = async (task: Partial<ITask>): Promise<ITask> => {
  try {
    return await TaskModel.create(task);
  } catch (error: any) {
    throw new Error("Error creating task: " + (error as Error).message);
  }
};

export const getTaskById = async (id: string): Promise<ITask | null> => {
  try {
    return await TaskModel.findById(id);
  } catch (error: any) {
    throw new Error("Error fetching task by ID: " + (error as Error).message);
  }
};

export const updateTask = async (id: string, task: Partial<ITask>): Promise<ITask | null> => {
  try {
    return await TaskModel.findByIdAndUpdate(id, task);
  } catch (error: any) {
    throw new Error("Error updating task: " + (error as Error).message);
  }
};

export const deleteTask = async (id: string): Promise<ITask | null> => {
  try {
    return await TaskModel.findByIdAndDelete(id);
  } catch (error: any) {
    throw new Error("Error deleting task: " + (error as Error).message);
  }
};
