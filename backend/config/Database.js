import { Sequelize } from "sequelize";
import config from "./Config.js";

const db = new Sequelize("control_bs", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
