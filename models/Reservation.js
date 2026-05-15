const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    laptop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Laptop",
    },
    borrowDate: Date,
    returnDate: Date,
    status: {
      type: String,
      enum: ["pending", "approved", "returned", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);