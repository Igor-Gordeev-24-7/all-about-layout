import mongoose from "mongoose";

const connectDBMembers = async () => {
  try {
    await mongoose.createConnection("mongodb+srv://igorgordeev247:<password>@cluster0.525zc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/members", {
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
