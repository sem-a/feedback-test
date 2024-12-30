const express = require("express");
const { vote, get, cancle, count } = require("../controllers/voted");
const { auth } = require("../middleware/auth");
const router = express.Router();

// /api/vote
router.post("/", auth, vote);

// /api/vote/get
router.get("/get", get);

// /api/vote/cancle
router.post("/cancle", auth, cancle);

// api/vote/count
router.get("/count", count);

module.exports = router;
