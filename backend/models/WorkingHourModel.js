import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const WorkingHour = db.define(
  "working_hours",
  {
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true
    },
  },
  {
    freezeTableName: true,
  }
);

export default WorkingHour;
