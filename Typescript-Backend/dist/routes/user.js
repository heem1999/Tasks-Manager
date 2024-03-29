"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// controller functions
const { loginUser, signupUser } = require('../controllers/userController');
const router = express_1.default.Router();
// login route
router.post('/login', loginUser);
// signup route
router.post('/signup', signupUser);
module.exports = router;
