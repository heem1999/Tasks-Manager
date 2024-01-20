"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.createTask = exports.getTask = exports.getTasks = void 0;
const taskModel_1 = require("../models/taskModel");
const mongoose_1 = __importDefault(require("mongoose"));
// get all Tasks
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user._id;
    const tasks = yield taskModel_1.Task.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
});
exports.getTasks = getTasks;
// get a single tasks
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such task" });
    }
    const task = yield taskModel_1.Task.findById(id);
    if (!task) {
        return res.status(404).json({ error: "No such task" });
    }
    res.status(200).json(task);
});
exports.getTask = getTask;
// create new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const task = yield taskModel_1.Task.create({
            title,
            description,
            date,
            status,
            user_id,
        });
        res.status(200).json(task);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createTask = createTask;
// delete a task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such task" });
    }
    const task = yield taskModel_1.Task.findOneAndDelete({ _id: id });
    if (!task) {
        return res.status(400).json({ error: "No such task" });
    }
    res.status(200).json(task);
});
exports.deleteTask = deleteTask;
// update a task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, date, status } = req.body;
    let emptyFields = [];
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
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
    const task = yield taskModel_1.Task.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!task) {
        return res.status(400).json({ error: "No such task" });
    }
    const up_task = yield taskModel_1.Task.findById(id);
    res.status(200).json(up_task);
});
exports.updateTask = updateTask;
