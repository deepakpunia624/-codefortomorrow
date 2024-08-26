const { DataTypes } = require("sequelize");
const sequelize = require("../../connection/dbConnection").sequelize;

const ServicePrice = sequelize.define(
  "ServicePrice",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceID: {
      type: DataTypes.INTEGER,
      references: {
        model: "services",
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM("Hourly", "Weekly", "Monthly"),
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    createdBy: {
      type: DataTypes.DATE,
    },
    updatedBy: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "service_prices",
    timestamps: false,
  }
);

module.exports = ServicePrice;
