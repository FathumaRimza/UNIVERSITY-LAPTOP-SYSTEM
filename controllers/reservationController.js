const Reservation = require("../models/Reservation");
const Laptop = require("../models/Laptop");


exports.createReservation = async (req, res) => {
  try {

    const { laptop, borrowDate, returnDate } = req.body;

    const foundLaptop = await Laptop.findById(laptop);

    if (!foundLaptop) {
      return res.status(404).json({
        message: "Laptop not found",
      });
    }

    if (foundLaptop.status !== "available") {
      return res.status(400).json({
        message: "Laptop not available",
      });
    }

    const reservation = await Reservation.create({
      student: req.user.id,
      laptop,
      borrowDate,
      returnDate,
      status: "pending",
    });

    foundLaptop.status = "reserved";

    await foundLaptop.save();

    res.status(201).json(reservation);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getReservations = async (req, res) => {
  try {

    const reservations = await Reservation.find()
      .populate("student", "name email")
      .populate("laptop");

    res.json(reservations);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getMyReservations = async (req, res) => {
  try {

    const reservations = await Reservation.find({
      student: req.user.id,
    }).populate("laptop");

    res.json(reservations);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


exports.approveReservation = async (req, res) => {
  try {

    const reservation = await Reservation.findById(
      req.params.id
    );

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    reservation.status = "approved";

    await reservation.save();

    await Laptop.findByIdAndUpdate(
      reservation.laptop,
      {
        status: "borrowed",
      }
    );

    res.json({
      message: "Reservation approved",
      reservation,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


exports.rejectReservation = async (req, res) => {
  try {

    const reservation = await Reservation.findById(
      req.params.id
    );

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    reservation.status = "rejected";

    await reservation.save();

    await Laptop.findByIdAndUpdate(
      reservation.laptop,
      {
        status: "available",
      }
    );

    res.json({
      message: "Reservation rejected",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};