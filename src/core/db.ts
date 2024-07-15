import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { SessionEntity } from "../entities/SessionEntity";
import "../envConfig";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGODB_URL,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  entities: [User, SessionEntity],
  synchronize: true,
});

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Error during database connection initialization", error);
  }
})();
