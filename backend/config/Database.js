import { Sequelize } from "sequelize";
import Config from "./Config.js";

const db = new Sequelize(Config.sequelize.database, Config.sequelize.database_username, Config.sequelize.database_password, {
  host: Config.sequelize.host,
  dialect: Config.sequelize.dialect,
});

export default db;
