const categorySchema = require("../models/categorySchema/categoryCollection");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      const category = new categorySchema({
        categoryName,
      });
      await category.save();
      res.status(201).json({
        success: true,
        message: "Category created successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const categories = await categorySchema.find().exec();
      res.status(200).json({
        success: true,
        message: "Category retrived successfully",
        categories: categories,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  categoryUpdate: async (req, res) => {
    const id = req.params.id;
    try {
      const data = await categorySchema.findByIdAndUpdate(id, req.body);
      if (!data) {
        res.status(402).json({
          success: false,
          message: "Category not found",
        });
      } else {
        res.status(201).json({
          success: true,
          message: "Category updated successfully",
          categories: data,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  categoryDelete: async (req, res) => {
    const id = req.params.id;
    try {
      const data = await categorySchema.findByIdAndDelete(id);
      if (!data) {
        res.status(402).json({
          success: false,
          message: "Category not found",
        });
      } else {
        res.status(201).json({
          success: true,
          message: "Category deleted successfully",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
