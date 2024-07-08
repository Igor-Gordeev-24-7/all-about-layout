import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/layouts", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoDB connect");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
export default connectDB;
