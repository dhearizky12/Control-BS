import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: [".env.development.local", ".env"] });
const envVars = process.env;

const Config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  sequelize: {
    host: envVars.SEQUELIZE_HOST,
    dialect: envVars.SEQUELIZE_DIALECT,
    database: envVars.SEQUELIZE_DATABASE,
    database_username: envVars.SEQUELIZE_DATABASE_USERNAME,
    database_password: envVars.SEQUELIZE_DATABASE_PASSWORD,
  },
};

export default Config;
