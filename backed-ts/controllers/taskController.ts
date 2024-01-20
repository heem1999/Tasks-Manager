import { Task } from "../models/taskModel";

import mongoose from "mongoose";

import { NextFunction, Request, Response } from "express";

// get all Tasks
export const getTasks = async (req: Request, res: Response,) => {
  const user_id = req.user._id;

  const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

// get a single tasks
export const getTask = async (req: Request, res: Response,) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

// create new task
export const createTask = async (req: Request, res: Response,) => {
  const { title, description, date, status } = req.body;

  let emptyFields = [];

  if (!title || title.trim().length === 0) {
    emptyFields.push("title");
  }
  if (!description || description.trim().length === 0) {
    emptyFields.push("description");
  }
  if (!date) {
    emptyFields.push("date");
  }
  if (!status) {
    emptyFields.push("status");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const task = await Task.create({
      title,
      description,
      date,
      status,
      user_id,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a task
export const deleteTask = async (req: Request, res: Response,) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

// update a task
export const updateTask = async (req: Request, res: Response,) => {
  const { id } = req.params;
  const { title, description, date, status } = req.body;

  let emptyFields = [];
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  if (!title || title.trim().length === 0) {
    emptyFields.push("title");
  }
  if (!description || description.trim().length === 0) {
    emptyFields.push("description");
  }
  if (!date || date.trim().length === 0) {
    emptyFields.push("date");
  }
  if (!status) {
    emptyFields.push("status");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  const up_task = await Task.findById(id);

  res.status(200).json(up_task);
};


