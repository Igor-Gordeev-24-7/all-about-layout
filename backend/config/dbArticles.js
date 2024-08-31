import mongoose from "mongoose";

const connectDBArticles = async () => {
  try {
    await mongoose.createConnection(
      "mongodb://79-174-86-232.cloudvps.regruhosting.ru:27017/articles",
    );
    console.log("mongoDB articles connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDBArticles;
