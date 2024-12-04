import { DataSource } from "typeorm";
import { Template } from "../entities/Template.entity";
import { User } from "../entities/user.entity";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST, // Leer desde variables de entorno
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true,
  entities: [User, Template],
});
