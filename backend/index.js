import router from "./routes/layouts.js";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";

const app = express();
connectDB();

app.use(cors());

app.use(
  express.json({
    extended: false,
  })
);

app.use("/", router);

app.listen(5001, () => {
  console.log(`Сервер запущен на порту 5001`);
});
