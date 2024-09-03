import express from "express";
import Article from "../models/Article.js";

const articlesRouter = express.Router();

articlesRouter.get("/articles", async (req, res) => {
  try {
    const article = await Article.find();
    res.json(article).status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Маршрут для удаления записи по ID
articlesRouter.delete("/articles/:id", async (req, res) => {
  try {
    const articleId = req.params.id;
    const deletedArticle = await Article.findByIdAndDelete(articleId);
    if (!deletedArticle) {
      return res.status(404).json({ msg: "Запись не найдена" });
    }
    res.json({ msg: "Запись удалена" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Маршрут для добавления новой записи
articlesRouter.post("/articles", async (req, res) => {
  try {
    const { name, author, date, tag, content } = req.body;

    // Проверка на обязательные поля
    if (!name || !author || !date || !tag || !content) {
      return res
        .status(400)
        .json({ error: "Некоторые обязательные поля не заполнены" });
    }

    // Создание нового макета
    const newArticle = new Article({
      name,
      author,
      date,
      tag,
      content,
    });

    const article = await newArticle.save();
    res.status(201).json(article);
  } catch (error) {
    console.error("Ошибка сервера:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Маршрут для обновления записи по ID
articlesRouter.put("/articles/:id", async (req, res) => {
  try {
    const { name, author, date, tag, content } = req.body;

    // Проверка на обязательные поля
    if (!name || !author || !date || !tag || !content) {
      return res
        .status(400)
        .json({ error: "Некоторые обязательные поля не заполнены" });
    }

    const articleId = req.params.id;
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      {
        name,
        author,
        date,
        tag,
        content,
      },
      { new: true } // Возвращает обновленный документ
    );

    if (!updatedArticle) {
      return res.status(404).json({ msg: "Запись не найдена" });
    }

    res.json(updatedArticle);
  } catch (error) {
    console.error("Ошибка сервера:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

export default articlesRouter;
