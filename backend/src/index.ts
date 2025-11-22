import { config } from "dotenv";
config();
import express from "express";
import authRouter from "./routes/auth-router.js";
import topicRouter from "./routes/topic-router.js";
import newTopicRouter from "./routes/new-topic-router.js";
import notFoundRouter from "./routes/not-found-router.js";
import errorRouter from "./routes/error-router.js";
import mongoose from "mongoose";
import helmet from "helmet";
import corsManager from "./util/corsManager.js";

if (
  !process.env.PORT ||
  !process.env.JWT_SECRET ||
  !process.env.MONGO_USER ||
  !process.env.MONGO_PASSWORD ||
  !process.env.MONGO_DATABASE
) {
  console.error("FATAL ERROR: Missing required environment variables.");
  process.exit(1);
}

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zdmjr.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

await mongoose.connect(MONGODB_URI);
console.log("\x1b[32mConnected to MongoDB\x1b[0m");

const app = express();

app.use(express.json());

app.use(helmet()); // Security headers

app.use(corsManager);

app.use("/topics", topicRouter);

app.use("/new-topic", newTopicRouter);

app.use("/auth", authRouter);

app.use(notFoundRouter);

app.use(errorRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `\x1b[32m\Server listening on port \x1b[34m${process.env.PORT}\x1b[0m`
  );
});
