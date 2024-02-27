import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Product from "./ProductModel.js";

const { DataTypes } = Sequelize;

const Target = db.define(
  "targets",
  {
    mid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    target: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER, // 1 is active, 0 is done/closed
      defaultValue: 1,
    },
  },
  {
    freezeTableName: true,
  }
);

Product.hasMany(Target);
Target.belongsTo(Product);

export default Target;
