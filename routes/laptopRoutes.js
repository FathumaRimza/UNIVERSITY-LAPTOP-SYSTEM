const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  addLaptop,
  getLaptops,
  updateLaptop,
  deleteLaptop,
} = require("../controllers/laptopController");


router.get("/", getLaptops);


router.post("/", auth, role(["admin"]), addLaptop);


router.put("/:id", auth, role(["admin"]), updateLaptop);


router.delete("/:id", auth, role(["admin"]), deleteLaptop);

module.exports = router;