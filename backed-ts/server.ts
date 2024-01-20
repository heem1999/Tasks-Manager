import express from "express";
import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();
import { rateLimit } from 'express-rate-limit';


const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");
var cors = require("cors");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "You have exceeded the 100 requests in 15 minutes limit!",
});

// express app
const app = express();

app.use(cors());
// Apply the rate limiting middleware to all requests.
app.use(limiter);
// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

//const port = process.env.PORT;
const databaseUrl = process.env.MONGO_URI as string;


// connect to db
mongoose
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
