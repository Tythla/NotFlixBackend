import path from "path";
import dotenv from "dotenv";

const envPath =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({
  path: path.resolve(__dirname, "../", envPath),
});
