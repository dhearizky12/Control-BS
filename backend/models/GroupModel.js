import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Group = db.define(
  "groups",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  {
    freezeTableName: true,
  }
);

export default Group;
