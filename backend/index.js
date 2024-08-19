import layoutsRouter from "./routes/layouts.js";
import articlesRouter from "./routes/articles.js";
import membersRouter from "./routes/members.js";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import connectDBArticles from "./config/dbArticles.js";
import connectDBMembers from "./config/dbMembers.js";

const app = express();

// Подключение к базам данных
connectDB();
connectDBArticles();
connectDBMembers();

app.use(cors({
  origin: 'http://xn-----dlccmda3b6axehn.online', // Разрешите запросы с этого домена
  methods: ['GET', 'POST'], // Разрешите только нужные методы
  credentials: true // Если ваш запрос требует передачи cookies или авторизации
}));
app.use(express.json());

app.use("/", layoutsRouter);
app.use("/", articlesRouter);
app.use("/", membersRouter);

app.listen(5001, () => {
  console.log(`Сервер запущен на порту 5001`);
});
