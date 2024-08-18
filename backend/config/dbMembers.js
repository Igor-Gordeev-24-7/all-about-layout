import mongoose from "mongoose";

const connectDBMembers = async () => {
  try {
    await mongoose.createConnection("mongodb://79.174.86.232:27017/members", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoDB members connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDBMembers;
