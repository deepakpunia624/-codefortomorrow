const mongoose = require("mongoose");

const servicePriceSchema = mongoose.Schema({
  duration: { type: String, required: true },

  serviceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  type: {
    type: String,
    enum: ["Hourly", "Weekly", "Monthly"],
  },
  price: {
    type: Number,
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
module.exports = mongoose.model("ServicePrice", servicePriceSchema);
