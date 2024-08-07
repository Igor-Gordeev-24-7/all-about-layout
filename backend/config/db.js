import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/layouts", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoDB layouts connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
