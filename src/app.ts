import express from "express";
import session from "express-session";
import "./envConfig";
import "reflect-metadata";
import { AppDataSource } from "./core/db";
import userRoutes from "./core/routes";
import authRoutes from './auth/routes';
import movieRoutes from "./movie/routes"
import passport, { authenticate } from "passport";
import { useJwtStrategy } from "./auth/passport";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

useJwtStrategy();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/api', userRoutes);
app.use('/movies', movieRoutes);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/auth", authRoutes); //use this after the session

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('The route is protected');
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
