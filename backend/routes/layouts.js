import express from "express";
import Layout from "../models/Layout.js";

const layoutsRouter = express.Router();

layoutsRouter.get("/layouts", async (req, res) => {
  try {
    const layouts = await Layout.find();
    res.json(layouts).status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Маршрут для удаления записи по ID
layoutsRouter.delete("/layouts/:id", async (req, res) => {
  try {
    const layoutId = req.params.id;
    const deletedLayout = await Layout.findByIdAndDelete(layoutId);
    if (!deletedLayout) {
      return res.status(404).json({ msg: "Запись не найдена" });
    }
    res.json({ msg: "Запись удалена" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Маршрут для добавления новой записи
layoutsRouter.post("/layouts", async (req, res) => {
  try {
    const {
      name,
      description,
      layoutLink,
      imgLink,
      tags,
      skills,
      linkToLive,
      author,
    } = req.body;

    // Проверка на обязательные поля
    if (
      !name ||
      !description ||
      !layoutLink ||
      !imgLink ||
      !linkToLive ||
      !author
    ) {
      return res
        .status(400)
        .json({ error: "Некоторые обязательные поля не заполнены" });
    }

    // Создание нового макета
    const newLayout = new Layout({
      name,
      description,
      layoutLink,
      imgLink,
      tags,
      skills,
      linkToLive,
      author,
    });

    const layout = await newLayout.save();
    res.status(201).json(layout);
  } catch (error) {
    console.error("Ошибка сервера:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Маршрут для обновления записи по ID
layoutsRouter.put("/layouts/:id", async (req, res) => {
  try {
    const {
      name,
      description,
      layoutLink,
      imgLink,
      tags,
      skills,
      linkToLive,
      author,
    } = req.body;

    // Проверка на обязательные поля
    if (
      !name ||
      !description ||
      !layoutLink ||
      !imgLink ||
      !linkToLive ||
      !author
    ) {
      return res
        .status(400)
        .json({ error: "Некоторые обязательные поля не заполнены" });
    }

    const layoutId = req.params.id;
    const updatedLayout = await Layout.findByIdAndUpdate(
      layoutId,
      {
        name,
        description,
        layoutLink,
        imgLink,
        tags,
        skills,
        linkToLive,
        author,
      },
      { new: true } // Возвращает обновленный документ
    );

    if (!updatedLayout) {
      return res.status(404).json({ msg: "Запись не найдена" });
    }

    res.json(updatedLayout);
  } catch (error) {
    console.error("Ошибка сервера:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

export default layoutsRouter;
