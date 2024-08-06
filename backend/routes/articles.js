import express from "express";
const articlesRouter = express.Router();
import Article from "../models/Article.js";

articlesRouter.get("/articles", async (req, res) => {
  try {
    const article = await Article.find();
    res.json(article).status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

export default articlesRouter;
