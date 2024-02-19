import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Shift from "./ShiftModel.js";

const { DataTypes } = Sequelize;

const Production = db.define(
  "productions",
  {
    group: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mixResult: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    additionBS: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    grammage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    result: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    waste: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
  }
);

Shift.hasMany(Production)
Production.belongsTo(Shift);

Production.sync();

export default Production;
