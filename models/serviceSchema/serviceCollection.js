const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../connection/dbConnection").sequelize;
const ServicePrice = require("../sercvicePriceSchema/priceCollection");

const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM("normal", "vip"),
    },
    price: {
      type: DataTypes.INTEGER,
      references: {
        model: "service_prices",
        key: "id",
      },
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
    sequelize,
    modelName: "Service",
    tableName: "services",
    timestamps: false,
  }
);

Service.hasMany(ServicePrice, { as: "prices", foreignKey: "serviceID" });
ServicePrice.belongsTo(Service, { as: "service", foreignKey: "serviceID" });

module.exports = Service;
