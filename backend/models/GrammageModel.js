import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Target from "./TargetModel.js";
import Shift from "./ShiftModel.js";

const { DataTypes } = Sequelize;

const Grammage = db.define(
  "grammages",
  {
    sample1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sample2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sample3: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sample4: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    average: {
      type: DataTypes.VIRTUAL,
      get() {
        return (this.sample1 + this.sample2 + this.sample3 + this.sample4) / 4;
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Target.hasMany(Grammage);
Grammage.belongsTo(Target);

Shift.hasMany(Grammage);
Grammage.belongsTo(Shift);

Grammage.sync();

export default Grammage;
