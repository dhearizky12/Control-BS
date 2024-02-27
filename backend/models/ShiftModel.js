import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import WorkingHour from "./WorkingHourModel.js";

const { DataTypes } = Sequelize;

const Shift = db.define(
  "shifts",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Shift.belongsTo(WorkingHour, { as: 'startWorkingHour', foreignKey: 'startWorkingHourId' });
Shift.belongsTo(WorkingHour, { as: 'endWorkingHour', foreignKey: 'endWorkingHourId' });

export default Shift;
