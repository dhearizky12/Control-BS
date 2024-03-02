import dotenv from "dotenv";

const envVars = process.env;
let envPath = [".env.development.local"];
if (envVars.NODE_ENV == "production") envPath = [".env"];

dotenv.config({ path: envPath });

const Config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  publicFolder: envVars.PUBLIC_FOLDER,
  sequelize: {
    host: envVars.SEQUELIZE_HOST,
    dialect: envVars.SEQUELIZE_DIALECT,
    database: envVars.SEQUELIZE_DATABASE,
    database_username: envVars.SEQUELIZE_DATABASE_USERNAME,
    database_password: envVars.SEQUELIZE_DATABASE_PASSWORD,
  },
};

export default Config;
