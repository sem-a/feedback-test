const express = require("express");
const { vote, get, cancle, count } = require("../controllers/voted");
const router = express.Router();

// /api/vote
router.post("/", vote);

// /api/vote/get
router.post("/get", get);

// /api/vote/cancle
router.post("/cancle", cancle);

// api/vote/count
router.post("/count", count);

module.exports = router;
