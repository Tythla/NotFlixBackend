import express from "express";
import "./envConfig";
import "reflect-metadata";
import { AppDataSource } from "./core/db";
import userRoutes from "./core/routes";
import authRoutes from './auth/routes';
import passport, { authenticate } from "passport";
import { useJwtStrategy } from "./auth/passport";

const app = express();
const port = process.env.PORT || 3000;

useJwtStrategy();

app.use(express.json());
app.use(passport.initialize());
app.use('/api', userRoutes);
app.use('/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('The route is protected');
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
