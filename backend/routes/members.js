import express from "express";
import Members from "../models/Members.js";

const membersRouter = express.Router();

membersRouter.get("/members", async (req, res) => {
  try {
    const members = await Members.find();
    res.json(members).status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Маршрут для удаления записи по ID
membersRouter.delete("/members/:id", async (req, res) => {
  try {
    const membersId = req.params.id;
    const deletedMembers = await Members.findByIdAndDelete(membersId);
    if (!deletedMembers) {
      return res.status(404).json({ msg: "Запись не найдена" });
    }
    res.json({ msg: "Запись удалена" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Маршрут для добавления новой записи
membersRouter.post("/members", async (req, res) => {
  try {
    const { name, description, imgLink, tags } = req.body;

    // Проверка на обязательные поля
    if (!name || !description || !imgLink || !tags) {
      return res
        .status(400)
        .json({ error: "Некоторые обязательные поля не заполнены" });
    }

    // Создание нового макета
    const newMembers = new Members({
      name,
      description,
      imgLink,
      tags,
    });

    const member = await newMembers.save();
    res.status(201).json(member);
  } catch (error) {
    console.error("Ошибка сервера:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Маршрут для обновления записи по ID
membersRouter.put("/members/:id", async (req, res) => {
  try {
    const { name, description, imgLink, tags } = req.body;

    // Проверка на обязательные поля
    if (!name || !description || !imgLink || !tags) {
      return res
        .status(400)
        .json({ error: "Некоторые обязательные поля не заполнены" });
    }

    const memberId = req.params.id;
    const updatedMembers = await Members.findByIdAndUpdate(
      memberId,
      {
        name,
        description,
        imgLink,
        tags,
      },
      { new: true } // Возвращает обновленный документ
    );

    if (!updatedMembers) {
      return res.status(404).json({ msg: "Запись не найдена" });
    }

    res.json(updatedMembers);
  } catch (error) {
    console.error("Ошибка сервера:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

export default membersRouter;
