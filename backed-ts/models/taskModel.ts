import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface TaskDoc extends Document {

  title: string;
  description: string;
  date: number;
  status: string;
  user_id: string;
}


const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<TaskDoc>('Task', taskSchema);

export { Task }