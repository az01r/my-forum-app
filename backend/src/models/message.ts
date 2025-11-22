import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

export default Message;
