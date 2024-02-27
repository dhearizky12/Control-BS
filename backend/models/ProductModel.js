import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define(
  "products",
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

export default Product;
