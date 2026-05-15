const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema({
  laptopName: { type: String, required: true },
  brand: String,
  serialNumber: { type: String, unique: true },
  specs: String,
  status: {
    type: String,
    enum: ["available", "reserved", "borrowed", "maintenance"],
    default: "available",
  },
});

module.exports = mongoose.model("Laptop", laptopSchema);