const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  serviceName: { type: String, required: true },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  type: {
    type: String,
    enum: ["normal", "vip"],
  },
  price: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServicePrice",
  },
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
module.exports = mongoose.model("Service", serviceSchema);
