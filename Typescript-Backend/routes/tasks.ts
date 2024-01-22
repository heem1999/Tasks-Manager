import express from "express";

import {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController";

import {
  requireAuth
} from "../middleware/requireAuth";

const router = express.Router();

// require auth for all Task routes
router.use(requireAuth);

// GET all Tasks
router.get("/", getTasks);

//GET a single Task
router.get("/:id", getTask);

// POST a new Task
router.post("/", createTask);

// DELETE a Task
router.delete("/:id", deleteTask);

// UPDATE a Task
router.patch("/:id", updateTask);

module.exports = router;
