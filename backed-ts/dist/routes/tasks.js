"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const requireAuth_1 = require("../middleware/requireAuth");
const router = express_1.default.Router();
// require auth for all Task routes
router.use(requireAuth_1.requireAuth);
// GET all Tasks
router.get("/", taskController_1.getTasks);
//GET a single Task
router.get("/:id", taskController_1.getTask);
// POST a new Task
router.post("/", taskController_1.createTask);
// DELETE a Task
router.delete("/:id", taskController_1.deleteTask);
// UPDATE a Task
router.patch("/:id", taskController_1.updateTask);
module.exports = router;
