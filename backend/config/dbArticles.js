import mongoose from "mongoose";

const connectDBArticles = async () => {
  try {
    await mongoose.createConnection("mongodb://localhost:27017/articles", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoDB articles connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDBArticles;
