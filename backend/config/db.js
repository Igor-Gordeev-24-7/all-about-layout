import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("http://79.174.86.232:27017/layouts", {
    });
    console.log("mongoDB layouts connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
