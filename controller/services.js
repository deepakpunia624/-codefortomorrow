const serviceSchema = require("../models/serviceSchema/serviceCollection");
const categorySchema = require("../models/categorySchema/categoryCollection");
const servicePriceSchema = require("../models/sercvicePriceSchema/priceCollection");

module.exports = {
  createService: async (req, res) => {
    const categoryId = req.params.id;
    const serviceData = req.body;
    try {
      const category = await categorySchema.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      const service = new serviceSchema({
        ...serviceData,
        categoryId: categoryId,
      });

      const priceOptions = serviceData.priceOptions;
      if (priceOptions && priceOptions.length > 0) {
        priceOptions.forEach(async (priceOption) => {
          const newPriceOption = new servicePriceSchema({
            ...priceOption,
            serviceID: service._id,
          });
          await newPriceOption.save();
          service.price = newPriceOption._id;
        });
      }
      await service.save();
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
      const services = await serviceSchema.find({ categoryId: categoryId });
      if (!services) {
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
    const categoryId = req.params.id;
    const serviceId = req.params.id;
    try {
      const service = await serviceSchema.findByIdAndDelete(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).json({
        success: true,
        message: "Service remove successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
