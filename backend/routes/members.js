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

export default membersRouter;
