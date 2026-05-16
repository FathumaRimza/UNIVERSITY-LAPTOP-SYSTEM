const Laptop = require("../models/Laptop");


exports.addLaptop = async (req, res) => {
  try {
    const laptop = await Laptop.create(req.body);

    res.status(201).json(laptop);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getLaptops = async (req, res) => {
  try {

    const laptops = await Laptop.find();

    res.json(laptops);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


exports.updateLaptop = async (req, res) => {
  try {

    const updatedLaptop = await Laptop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedLaptop) {
      return res.status(404).json({
        message: "Laptop not found",
      });
    }

    res.json(updatedLaptop);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


exports.deleteLaptop = async (req, res) => {
  try {

    const deletedLaptop = await Laptop.findByIdAndDelete(
      req.params.id
    );

    if (!deletedLaptop) {
      return res.status(404).json({
        message: "Laptop not found",
      });
    }

    res.json({
      message: "Laptop deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

