import mongoose, { Document, Schema, Model } from "mongoose";

export interface TaskDocument extends Document {
  taskName: string;
  taskStartDate: Date;
  taskEndDate: Date;
  taskTitle: string;
  taskBody: string;
  taskImage: string;
  createdAt: Date;
}

const taskSchema = new Schema<TaskDocument>(
  {
    taskName: { type: String, required: true },
    taskStartDate: { type: Date, required: true },
    taskEndDate: { type: Date, required: true },
    taskTitle: { type: String, default: "" },
    taskBody: { type: String, default: "" },
    taskImage: { type: String, default: "" },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);

const Task: Model<TaskDocument> = mongoose.model<TaskDocument>("Task", taskSchema);
export default Task;
