const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createReservation,
  getReservations,
  getMyReservations,
  approveReservation,
  rejectReservation,
   returnLaptop
} = require("../controllers/reservationController");


router.post(
  "/",
  auth,
  role(["student"]),
  createReservation
);


router.get(
  "/my",
  auth,
  role(["student"]),
  getMyReservations
);


router.get(
  "/",
  auth,
  role(["admin"]),
  getReservations
);


router.put(
  "/:id/approve",
  auth,
  role(["admin"]),
  approveReservation
);


router.put(
  "/:id/reject",
  auth,
  role(["admin"]),
  rejectReservation
);

router.put(
  "/:id/return",
  auth,
  role(["admin"]),
  returnLaptop
);

module.exports = router;