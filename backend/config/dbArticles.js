import mongoose from "mongoose";

const connectDBArticles = async () => {
  try {
    await mongoose.createConnection("mongodb+srv://igorgordeev247:<password>@cluster0.525zc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/articles", {
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
