const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/laptops", require("./routes/laptopRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));

const PORT = process.env.PORT || 5000;


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Server failed to start:", err.message);
  });