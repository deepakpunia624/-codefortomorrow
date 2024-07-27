const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: { type: String, required: true },

  createdBy: {
    type: Date,
  },
  updatedBy: {
    type: Date,
  },
  status: {
    type: Boolean,
  },
});
module.exports = mongoose.model("Category", categorySchema);
