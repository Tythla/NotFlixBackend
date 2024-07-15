import { Router } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "./db";

const router = Router();

router.get("/users", async (req, res) => {
  const userRepository = AppDataSource.getMongoRepository(User);
  const users = await userRepository.find();
  res.json(users);
});

router.post("/users", async (req, res) => {
  const userRepository = AppDataSource.getMongoRepository(User);
  const user = userRepository.create(req.body);
  await userRepository.save(user);
  res.status(201).json(user);
});

export default router;
