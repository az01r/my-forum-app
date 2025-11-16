import { Schema, model } from "mongoose";

const topicSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Topic = model("Topic", topicSchema);

export default Topic;
