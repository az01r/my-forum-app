import { config } from "dotenv";
config();
import bodyParser from "body-parser";
import express from "express";
import authRouter from "./routes/auth-router.ts";
import topicRouter from "./routes/topic-router.ts";
import newTopicRouter from "./routes/new-topic-router.ts";
import notFoundRouter from "./routes/not-found-router.ts";
import errorRouter from "./routes/error-router.ts";
import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zdmjr.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/topics", topicRouter);

app.use("/new-topic", newTopicRouter);

app.use("/auth", authRouter);

app.use(notFoundRouter);

app.use(errorRouter);

await mongoose.connect(MONGODB_URI);
console.log('\x1b[32m\Connected to MongoDB\x1b[0m');

app.listen(process.env.PORT, () => {
  console.log(`\x1b[32m\Server running at \x1b[34m\http://localhost:${process.env.PORT}\x1b[0m`);
});
