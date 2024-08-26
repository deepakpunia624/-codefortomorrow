const Service = require("../models/serviceSchema/serviceCollection");
const Category = require("../models/categorySchema/categoryCollection");
const ServicePrice = require("../models/sercvicePriceSchema/priceCollection");
const pool = require("../connection/dbConnection");

module.exports = {
  createService: async (req, res) => {
    const categoryId = req.params.id;
    const serviceData = req.body;

    try {
      const category = await Category.findOne({ where: { id: categoryId } });

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const service = await Service.create({
        serviceName: serviceData.serviceName,
        categoryId: categoryId,
        type: serviceData.type,
        status: serviceData.status,
      });

      const priceOptions = serviceData.priceOptions;
      if (priceOptions && priceOptions.length > 0) {
        for (const priceOption of priceOptions) {
          const priceResult = await ServicePrice.create({
            duration: priceOption.duration,
            serviceID: service.id,
            type: priceOption.type,
            price: priceOption.price,
            status: priceOption.status,
          });

          await service.update({ price: priceResult.id });
        }
      }

      res.status(201).json({
        success: true,
        message: "Service created successfully",
        service: service,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  getAllServicesByCategoryId: async (req, res) => {
    const categoryId = req.params.id;

    try {
      const services = await Service.findAll({
        where: { categoryId },
        include: [{ model: ServicePrice, as: "prices" }],
      });

      if (services.length === 0) {
        return res.status(404).json({ message: "No services found" });
      }

      res.status(200).json({
        success: true,
        services: services,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  removeServiceFromCategory: async (req, res) => {
    const serviceId = req.params.id;

    try {
      const service = await Service.findOne({ where: { id: serviceId } });

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      await service.destroy();

      res.status(200).json({
        success: true,
        message: "Service removed successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
