import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Shift = db.define(
  "shifts",
  {
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true
    },
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

Shift.sync();

export default Shift;
