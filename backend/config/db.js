import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://79.174.86.232:27017/layouts", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true, // Добавьте этот параметр, если требуется SSL/TLS соединение
    });
    console.log("mongoDB layouts connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
