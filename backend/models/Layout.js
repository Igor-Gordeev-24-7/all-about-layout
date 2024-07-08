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
  tags: [
    {
      type: String,
    },
  ],
  skills: [
    {
      type: String,
    },
  ],
});

export default mongoose.model("Layout", LayoutSchema);
