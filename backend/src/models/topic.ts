import fs from "node:fs/promises";
import CustomError from "../types/error-type.ts";

class Topic {
  id?: string;
  title: string;
  lastUpdated?: Date;

  constructor({ title }: { title: string }) {
    this.title = title;
  }

  static async fetchTopics() {
    try {
      const fileContent = await fs.readFile("./data/topics.json");
      const topicsData = JSON.parse(fileContent.toString()) as Topic[];
      return topicsData;
    } catch (error) {
      console.log(error);
      throw new CustomError("An error occured, couldn't fetch topics.", 500);
    }
  }

  async save() {
    try {
      const topics = await Topic.fetchTopics();
      // const newTopic = {
      //   id: new Date().toISOString(),
      //   title: this.title,
      //   lastUpdated: new Date(),
      // };
      // topics.unshift(newTopic);
      this.id = new Date().toISOString();
      this.lastUpdated = new Date();
      topics.unshift(this);
      await fs.writeFile("./data/topics.json", JSON.stringify(topics, null, 2));
      return this;
    } catch (error) {
      console.log(error);
      throw new CustomError("An error occured, couldn't save topic.", 500);
    }
  }
}

export default Topic;
