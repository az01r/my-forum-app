import type { NextFunction, Request, Response } from "express";
import Message from "../models/message.ts";

export const loadTopicMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const topicId = req.params.topicId as string;
  try {
    const topicsData = await Message.fetchByTopicId(topicId);
    res.status(200).json({ topics: topicsData });
  } catch (error: any) {
    next(error);
  }
};

export const saveTopicMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId!;
  const topicId = req.params.topicId as string;
  const text = req.body.text as string;
  const message = new Message({ userId, topicId, text });
  try {
    const newMessage = await message.save();
    res.status(201).json({ newMessage });
  } catch (error) {
    next(error);
  }
};
