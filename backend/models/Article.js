import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  tags: [String], // Массив строк
  content: [
    {
      type: String,
      required: true,
    },
  ],
});

export default mongoose.model("Article", ArticleSchema);
