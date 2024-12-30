const express = require("express");
const { reg, login, current } = require("../controllers/user");
const { auth } = require("../middleware/auth");
const router = express.Router();

// /api/user/reg
router.post("/reg", reg);

// /api/user/login
router.post("/login", login);

// /api/user/current
router.get("/current", auth, current);

module.exports = router;
