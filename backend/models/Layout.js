import mongoose from "mongoose";
const LayoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  layoutLink: {
    type: String,
    required: true,
  },
  imgLink: {
    type: String,
    required: true,
  },
  tags: [String], // Массив строк
  skills: [String], // Массив строк
  linkToLive: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Layout", LayoutSchema);
