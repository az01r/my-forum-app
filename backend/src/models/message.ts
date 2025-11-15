import fs from "node:fs/promises";
import CustomError from "../types/error-type.ts";
import path from "node:path";
import { tryReadOrCreateFile } from "../util/file.ts";

const filePath = path.join(process.cwd(), "data", "messages.json"); // ./data/messages.json

class Message {
  id?: string;
  topicId: string;
  userId: string;
  text: string;
  sentOn?: Date;

  constructor({
    text,
    topicId,
    userId,
  }: {
    text: string;
    topicId: string;
    userId: string;
  }) {
    this.text = text;
    this.topicId = topicId;
    this.userId = userId;
  }

  static async fetchByTopicId(topicId: string) {
    try {
      const fileContent = await tryReadOrCreateFile({ filePath });
      const messages = JSON.parse(fileContent) as Message[];
      const topicMessages = messages.filter((m) => m.topicId === topicId);
      return topicMessages;
    } catch (error) {
      console.log(error);
      throw new CustomError("An error occured, couldn't fetch messages.", 500);
    }
  }

  static async fetchAll() {
    try {
      const fileContent = await tryReadOrCreateFile({ filePath });
      const messages = JSON.parse(fileContent) as Message[];
      return messages;
    } catch (error) {
      console.log(error);
      throw new CustomError("An error occured, couldn't fetch messages.", 500);
    }
  }

  async save() {
    try {
      const messages = await Message.fetchAll();
      this.id = new Date().toISOString();
      this.sentOn = new Date();
      messages.push(this);
      await fs.writeFile(filePath, JSON.stringify(messages, null, 2));
      return this;
    } catch (error) {
      console.log(error);
      throw new CustomError("An error occured, couldn't save message.", 500);
    }
  }
}

export default Message;
