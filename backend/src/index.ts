import { config } from "dotenv";
config();
import bodyParser from "body-parser";
import express from "express";
import authRouter from "./routes/auth-router.ts";
import topicRouter from "./routes/topic-router.ts";
import notFoundRouter from "./routes/not-found-router.ts";
import errorRouter from "./routes/error-router.ts";
import CustomError from "./types/error-type.ts";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/topics", topicRouter);

app.use("/auth", authRouter);

app.use(notFoundRouter);

app.use(errorRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
