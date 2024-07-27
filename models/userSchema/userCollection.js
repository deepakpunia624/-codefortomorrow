const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String },

  password: { type: String },

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
module.exports = mongoose.model("User", userSchema);
