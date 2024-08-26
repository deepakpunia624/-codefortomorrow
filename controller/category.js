const Category = require("../models/categorySchema/categoryCollection");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;

      const category = await Category.create({ categoryName });

      res.status(201).json({
        success: true,
        message: "Category created successfully",
        category: category,
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
      const categories = await Category.findAll();

      res.status(200).json({
        success: true,
        message: "Categories retrieved successfully",
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
    const { categoryName } = req.body;

    try {
      const category = await Category.findOne({ where: { id } });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      const updatedCategory = await category.update({ categoryName });

      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        category: updatedCategory,
      });
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
      const deletedRows = await Category.destroy({
        where: { id },
      });

      if (deletedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
