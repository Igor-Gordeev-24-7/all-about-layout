import fs from 'fs';
import path from 'path';
import https from 'https';
import express from 'express';
import cors from 'cors';

import layoutsRouter from './routes/layouts.js';
import articlesRouter from './routes/articles.js';
import membersRouter from './routes/members.js';
import connectDB from './config/db.js';
import connectDBArticles from './config/dbArticles.js';
import connectDBMembers from './config/dbMembers.js';

// Создание Express приложения
const app = express();

// Подключение к базам данных
connectDB();
connectDBArticles();
connectDBMembers();

// Настройка CORS и парсинг JSON
app.use(cors());
app.use(express.json());

// Определение маршрутов
app.use('/', layoutsRouter);
app.use('/', articlesRouter);
app.use('/', membersRouter);

// Путь к сертификатам
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'sslcert', 'privkey.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'sslcert', 'fullchain.pem'))
};

// Запуск HTTPS сервера
https.createServer(sslOptions, app).listen(8443, () => {
  console.log('HTTPS сервер запущен на порту 8443');
});

// Опционально: Запуск HTTP сервера на порту 5001
// Вы можете оставить или закомментировать эту часть, если вы не хотите использовать HTTP
app.listen(5001, () => {
  console.log('HTTP сервер запущен на порту 5001');
});
