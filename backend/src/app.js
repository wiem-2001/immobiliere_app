import express from "express";
import cors from "cors";
import itemsRouter from "./routes/itemRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/items", itemsRouter);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
