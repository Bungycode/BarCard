const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Drink extends Model {}

Drink.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    drink_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_alcoholic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_favorite: {
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "drink",
  }
);

module.exports = Drink;
