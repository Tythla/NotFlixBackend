import { Router } from "express";
import { AppDataSource } from "../core/db";
import { User } from "../entities/User";
import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = Router();
const userRepository = AppDataSource.getRepository(User);
const jwtSecret = process.env.JWT_SECRET || "secret";

router.post("/signup", async (req, res) => {
  const { username, email, password, plan, api } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      username,
      email,
      password: hashedPassword,
      plan,
      api,
    });
    await userRepository.save(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = sign({ email: user.email, id: user._id }, jwtSecret, {
        expiresIn: "1h",
      });
      res.json({ token, user });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

export default router;
