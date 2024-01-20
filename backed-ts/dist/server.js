"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_rate_limit_1 = require("express-rate-limit");
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");
var cors = require("cors");
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: "You have exceeded the 100 requests in 15 minutes limit!",
});
// express app
const app = (0, express_1.default)();
app.use(cors());
// Apply the rate limiting middleware to all requests.
app.use(limiter);
// middleware
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// routes
app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);
//const port = process.env.PORT;
const databaseUrl = process.env.MONGO_URI;
// connect to db
mongoose_1.default
    .connect(databaseUrl)
    .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log("connected to db & listening on port", process.env.PORT);
    });
})
    .catch((error) => {
    console.log(error);
});
