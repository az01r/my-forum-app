import { config } from "dotenv";
config();
import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
import type { Topic, TopicParam } from "./types/topic-types.js";

async function loadTopics(): Promise<Topic[]> {
  try {
    const fileContent = await fs.readFile("./data/topics.json");
    const topicsData = JSON.parse(fileContent.toString());
    return topicsData;
  } catch (error) {
    return [];
  }
}

async function saveTopic(topic: TopicParam): Promise<Topic> {
  const topics = await loadTopics();
  const newTopic = {
    id: new Date().toISOString(),
    ...topic,
    lastUpdated: new Date(),
  };
  topics.unshift(newTopic);
  const dataToSave = topics;
  await fs.writeFile("./data/topics.json", JSON.stringify(dataToSave, null, 2));
  return newTopic;
}

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from TypeScript and ES Modules!");
});

app.get("/topics", async (req, res) => {
  console.log("Managing request to /topics");
  const topicsData = await loadTopics();
  console.log(topicsData);
  res.status(200).json({ topics: topicsData });
});

app.put("/new-topic", async (req, res) => {
  console.log("Managing request to /new-topic");
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required." });
  }
  try {
    const newTopic = await saveTopic({ title });
    res.status(201).json({ newTopic });
  } catch (error) {
    res.status(500).json({ error: "Error saving opinion." });
  }
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
