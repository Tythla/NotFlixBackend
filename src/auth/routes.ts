import { Router } from "express";
import { AppDataSource } from "../core/db";
import { User } from "../entities/User";
import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import session from "express-session";

const router = Router();
const userRepository = AppDataSource.getRepository(User);
const jwtSecret = process.env.JWT_SECRET || "secret";

router.post("/signup", async (req, res) => {
  console.log(req.body);
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
    console.log('user created');
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
      (req.session as any).user = { email: user.email, id: user._id };
      res.json({ token, user });
      console.log('login successful: \n', user)
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log('error logging in: ', error)
    res.status(500).json({ message: "Error logging in", error });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out", error: err });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
});

router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userRepository.findOne({ where: { email } });
    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error checking email", error });
  }
});

export default router;
