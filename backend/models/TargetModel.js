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
  },
  {
    freezeTableName: true,
  }
);

Product.hasMany(Target);
Target.belongsTo(Product);

Target.sync();

export default Target;
