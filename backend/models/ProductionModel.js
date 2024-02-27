import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Group from "./GroupModel.js";
import Shift from "./ShiftModel.js";
import Target from "./TargetModel.js";

const { DataTypes } = Sequelize;

const Production = db.define(
  "productions",
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    mixResult: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    additionBS: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grammage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    result: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    waste: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Group.hasMany(Production);
Production.belongsTo(Group);

Shift.hasMany(Production);
Production.belongsTo(Shift);

Target.hasMany(Production);
Production.belongsTo(Target);

export default Production;
