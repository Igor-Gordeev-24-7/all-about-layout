import mongoose from "mongoose";

const MembersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
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
});

export default mongoose.model("Members", MembersSchema);
