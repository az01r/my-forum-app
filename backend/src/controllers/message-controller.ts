import type { NextFunction, Request, Response } from "express";
import Message from "../models/message.js";

export const loadTopicMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const topicId = req.params.topicId as string;
  try {
    const messages = await Message.find({ topic: topicId }).populate('user', 'nickname');
    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};

export const createTopicMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId!;
  const topicId = req.params.topicId as string;
  const text = req.body.text as string;
  try {
    const message = new Message({ user: userId, topic: topicId, content: text });
    const newMessage = await message.save();
    res.status(201).json({ newMessage });
  } catch (error) {
    next(error);
  }
};
