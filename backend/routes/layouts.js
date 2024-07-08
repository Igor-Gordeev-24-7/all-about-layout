import express from "express";
const router = express.Router();
import Layout from "../models/Layout.js";

router.get("/", async (req, res) => {
  try {
    const layouts = await Layout.find();
    res.json(layouts).status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

export default router;
