const express = require("express");
const { reg, login, current } = require("../controllers/user");
const router = express.Router();

// /api/user/reg
router.post("/reg", reg);

// /api/user/login
router.post("/loging", login);

// /api/user/current
router.get("/current", current);

module.exports = router;
