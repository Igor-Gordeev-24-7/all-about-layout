import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://igorgordeev247:qwe156834QWE@cluster0.525zc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/layouts", {
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
