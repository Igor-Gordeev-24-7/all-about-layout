import fs from "fs";
import path from "path";
import https from "https";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import layoutsRouter from "./routes/layouts.js";
import articlesRouter from "./routes/articles.js";
import membersRouter from "./routes/members.js";
import connectDB from "./config/db.js";
import connectDBArticles from "./config/dbArticles.js";
import connectDBMembers from "./config/dbMembers.js";

// Создание Express приложения
const app = express();

// Подключение к базам данных
connectDB();
connectDBArticles();
connectDBMembers();

// Настройка CORS и парсинг JSON
app.use(cors());
app.use(express.json());

// Использование Helmet для базовой защиты
app.use(helmet());

// Определение маршрутов
app.use("/", layoutsRouter);
app.use("/", articlesRouter);
app.use("/", membersRouter);

// Путь к сертификатам, полученным через Certbot
const sslOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/79-174-86-232.cloudvps.regruhosting.ru/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/79-174-86-232.cloudvps.regruhosting.ru/fullchain.pem"),
};

// Запуск HTTPS сервера
https.createServer(sslOptions, app).listen(8443, () => {
  console.log("HTTPS сервер запущен на порту 8443");
});

// Опционально: Запуск HTTP сервера на порту 5001
// Вы можете оставить или закомментировать эту часть, если не хотите использовать HTTP
// app.listen(5001, () => {
//   console.log("HTTP сервер запущен на порту 5001");
// });
