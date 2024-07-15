import express from "express";
import "./envConfig";
import "reflect-metadata";
import { AppDataSource } from "./core/db";
import userRoutes from "./core/routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
