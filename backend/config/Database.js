import { Sequelize } from "sequelize";
const db = new Sequelize('control_bs', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;
