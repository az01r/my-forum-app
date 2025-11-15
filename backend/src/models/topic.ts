import fs from "node:fs/promises";
import CustomError from "../types/error-type.ts";
import path from "node:path";
import { tryReadOrCreateFile } from "../util/file.ts";

const filePath = path.join(process.cwd(), "data", "topics.json"); // ./data/topics.json

class Topic {
  id?: string;
  title: string;
  lastUpdated?: Date;

  constructor({ title }: { title: string }) {
    this.title = title;
  }

  static async fetchTopics() {
    try {
      const fileContent = await tryReadOrCreateFile({ filePath });
      const topicsData = JSON.parse(fileContent) as Topic[];
      return topicsData;
    } catch (error) {
      console.log(error);
      throw new CustomError("An error occured, couldn't fetch topics.", 500);
    }
  }

  async save() {
    try {
      const topics = await Topic.fetchTopics();
      this.id = new Date().toISOString();
      this.lastUpdated = new Date();
      topics.unshift(this);
      await fs.writeFile(filePath, JSON.stringify(topics, null, 2));
      return this;
    } catch (error) {
      console.log(error);
      throw new CustomError("An error occured, couldn't save topic.", 500);
    }
  }
}

export default Topic;
