import type { NextFunction, Request, Response } from "express";
import Topic from "../models/topic.ts";

export const loadTopics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topicsData = await Topic.find();
    res.status(200).json({ topics: topicsData });
  } catch (error) {
    next(error);
  }
};

export const saveTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.body;
  const topic = new Topic({ title });
  try {
    const newTopic = await topic.save();
    res.status(201).json({ newTopic });
  } catch (error) {
    next(error);
  }
};
